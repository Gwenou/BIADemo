﻿// <copyright file="WebApiRepository.cs" company="BIA.Net">
//  Copyright (c) BIA.Net. All rights reserved.
// </copyright>

namespace BIA.Net.Core.Infrastructure.Service.Repositories
{
    using Microsoft.Extensions.Caching.Distributed;
    using Microsoft.Extensions.Logging;
    using Newtonsoft.Json;
    using System;
    using System.Collections.Generic;
    using System.IdentityModel.Tokens.Jwt;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using System.Net.Mime;
    using System.Text;
    using System.Threading.Tasks;

    /// <summary>
    /// WebApi Repository.
    /// </summary>
    public abstract class WebApiRepository
    {
        /// <summary>
        /// The date format to use for adding date parameter in the url.
        /// </summary>
        protected const string FormatDate = "yyyy-MM-dd'T'HH:mm:ss";

        /// <summary>
        /// Bearer header name.
        /// </summary>
        protected const string Bearer = "Bearer";

        /// <summary>
        /// The distributed cache.
        /// </summary>
        protected readonly IDistributedCache distributedCache;

        /// <summary>
        /// Gets the HTTP client.
        /// </summary>
        protected readonly HttpClient httpClient;

        /// <summary>
        /// Gets the logger.
        /// </summary>
        protected readonly ILogger<WebApiRepository> logger;

        /// <summary>
        /// The child class name.
        /// </summary>
        protected readonly string className;

        /// <summary>
        /// Initializes a new instance of the <see cref="WebApiRepository"/> class.
        /// </summary>
        /// <param name="serviceProvider">The service provider.</param>
        protected WebApiRepository(HttpClient httpClient, ILogger<WebApiRepository> logger, IDistributedCache distributedCache)
        {
            this.httpClient = httpClient;
            this.logger = logger;
            this.distributedCache = distributedCache;
            this.className = this.GetType().Name;
        }

        /// <summary>
        /// Gets the T asynchronous.
        /// </summary>
        /// <typeparam name="T">Type of result.</typeparam>
        /// <param name="url">The URL.</param>
        /// <returns>Result, IsSuccessStatusCode, ReasonPhrase.</returns>
        protected virtual async Task<(T Result, bool IsSuccessStatusCode, string ReasonPhrase)> GetAsync<T>(string url, bool useBearerToken = false)
        {
            if (!string.IsNullOrWhiteSpace(url))
            {
                this.logger.LogInformation($"Call WebApi Get: {url}");

                if (useBearerToken)
                {
                    await AddAuthorizationBearerAsync();
                }

                HttpResponseMessage response = await this.httpClient.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    string res = await response.Content.ReadAsStringAsync();
                    T content = JsonConvert.DeserializeObject<T>(res);
                    return (content, response.IsSuccessStatusCode, default(string));
                }
                else
                {
                    this.logger.LogError($"Url:{url} ReasonPhrase:{response.ReasonPhrase}");
                    return (default(T), response.IsSuccessStatusCode, response.ReasonPhrase);
                }
            }

            return (default(T), default(bool), default(string));
        }

        /// <summary>
        /// Post the T asynchronous.
        /// </summary>
        /// <typeparam name="T">Type of result.</typeparam>
        /// <param name="url">The URL.</param>
        /// <param name="content">Content of the post.</param>
        /// <returns>Result, IsSuccessStatusCode, ReasonPhrase.</returns>
        protected virtual async Task<(T Result, bool IsSuccessStatusCode, string ReasonPhrase)> PostAsync<T, U>(string url, U body, bool useBearerToken = false, bool isFormUrlEncoded = false)
        {
            if (!string.IsNullOrWhiteSpace(url) && body != null)
            {
                this.logger.LogInformation($"Call WebApi Post: {url}");

                if (useBearerToken)
                {
                    await AddAuthorizationBearerAsync();
                }

                string json = JsonConvert.SerializeObject(body);

                HttpContent httpContent = default;

                if (isFormUrlEncoded)
                {
                    Dictionary<string, string> dictionary = JsonConvert.DeserializeObject<Dictionary<string, string>>(json);
                    httpContent = new FormUrlEncodedContent(dictionary);
                }
                else
                {
                    httpContent = new StringContent(json, Encoding.UTF8, MediaTypeNames.Application.Json);
                }

                HttpResponseMessage response = await this.httpClient.PostAsync(url, httpContent);
                httpContent?.Dispose();

                if (response.IsSuccessStatusCode)
                {
                    string res = await response.Content.ReadAsStringAsync();
                    T result = JsonConvert.DeserializeObject<T>(res);
                    return (result, response.IsSuccessStatusCode, default(string));
                }
                else
                {
                    this.logger.LogError($"Url:{url} ReasonPhrase:{response.ReasonPhrase}");
                    return (default(T), response.IsSuccessStatusCode, response.ReasonPhrase);
                }
            }

            return (default(T), default(bool), default(string));
        }

        protected virtual async Task AddAuthorizationBearerAsync()
        {
            if (this.httpClient.DefaultRequestHeaders.Authorization?.Scheme != Bearer)
            {
                string bearerToken = await this.GetBearerTokenInCacheAsync();

                if (string.IsNullOrWhiteSpace(bearerToken) || !this.CheckTokenValid(bearerToken))
                {
                    bearerToken = await this.GetBearerTokenAsync();
                }

                if (!string.IsNullOrWhiteSpace(bearerToken))
                {
                    _ = this.SetBearerTokenInCacheAsync(bearerToken);
                    this.httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(Bearer, bearerToken);
                }
                else
                {
                    _ = this.SetBearerTokenInCacheAsync(null);
                    throw new ArgumentNullException($"{nameof(bearerToken)} is empty in AddAuthorizationBearerAsync");
                }
            }
        }


        protected virtual DateTimeOffset GetJwtTokenExpirationDate(string token)
        {
            DateTimeOffset expirationDate = default;

            if (!string.IsNullOrWhiteSpace(token))
            {
                JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
                JwtSecurityToken jwtSecurityToken = tokenHandler.ReadJwtToken(token);
                expirationDate = new DateTimeOffset(jwtSecurityToken.ValidTo);
            }

            return expirationDate;
        }

        /// <summary>
        ///  Check if the token is valid.
        /// </summary>
        /// <param name="bearerToken">The bearerToken.</param>
        /// <returns>Return true if the token is valid.</returns>
        protected virtual bool CheckTokenValid(string token)
        {
            bool isValid = false;

            if (!string.IsNullOrWhiteSpace(token))
            {
                DateTimeOffset expirationDate = this.GetJwtTokenExpirationDate(token);
                isValid = expirationDate != default && expirationDate > DateTime.UtcNow.AddSeconds(10);
            }

            return isValid;
        }

        protected virtual string GetBearerCacheKey()
        {
            return $"{this.className}|{Bearer}";
        }

        protected virtual async Task<string> GetBearerTokenInCacheAsync()
        {
            return await this.distributedCache.GetStringAsync(this.GetBearerCacheKey());
        }

        protected virtual async Task SetBearerTokenInCacheAsync(string bearerToken)
        {
            if (!string.IsNullOrWhiteSpace(bearerToken))
            {
                DateTimeOffset expirationDate = GetJwtTokenExpirationDate(bearerToken);
                DistributedCacheEntryOptions option = new DistributedCacheEntryOptions() { AbsoluteExpiration = expirationDate.AddSeconds(-10) };
                await this.distributedCache.SetStringAsync(this.GetBearerCacheKey(), bearerToken, options: option);
            }
            else
            {
                await this.distributedCache.SetStringAsync(this.GetBearerCacheKey(), null);
            }
        }

        /// <summary>
        /// Retrieve a token from the provider.
        /// </summary>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        protected virtual Task<string> GetBearerTokenAsync()
        {
            throw new NotImplementedException("For authentication with bearer token, you must implement the GetBearerTokenAsync() method");
        }
    }
}
