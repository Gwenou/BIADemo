﻿// <copyright file="BIADistributedCache.cs" company="BIA.Net">
//     Copyright (c) BIA.Net. All rights reserved.
// </copyright>

namespace BIA.Net.Core.Infrastructure.Service.Repositories.Helper
{
    using System;
    using System.IO;
    using System.Threading.Tasks;
    using System.Xml.Serialization;
    using Microsoft.Extensions.Caching.Distributed;
    using Microsoft.Extensions.Caching.Memory;
    using Microsoft.Extensions.Logging;

    /// <summary>
    /// Store object in distributed with the IDistributedCache service
    /// </summary>
#pragma warning disable S101 // Types should be named in PascalCase
    public class BIADistributedCache : IBIADistributedCache
#pragma warning restore S101 // Types should be named in PascalCase
    {
        private readonly IDistributedCache distibutedCache;

        /// <summary>
        /// The logger.
        /// </summary>
        private readonly ILogger<BIADistributedCache> logger;

        /// <summary>
        /// Initializes a new instance of the <see cref="BIADistributedCache"/> class.
        /// </summary>
        /// <param name="cache">The distributed cache.</param>
        /// <param name="logger">The logger</param>
        public BIADistributedCache(IDistributedCache cache, ILogger<BIADistributedCache> logger)
        {
            this.distibutedCache = cache;
            this.logger = logger;
        }

        public async Task Add<T>(string key, T item, double cacheDurationInMinute)
        {
            byte[] encodedItemResolve = this.ObjectToByteArray(item);
            var options = new DistributedCacheEntryOptions()
                .SetAbsoluteExpiration(TimeSpan.FromMinutes(cacheDurationInMinute));
            await this.distibutedCache.SetAsync(key, encodedItemResolve, options);
        }

        public async Task<T> Get<T>(string key)
        {
            byte[] encodedItemResolve = await this.distibutedCache.GetAsync(key);
            if (encodedItemResolve != null)
            {
                return this.ByteArrayToObject<T>(encodedItemResolve);
            }

            return default(T);
        }

        public async Task Remove(string key)
        {
            try
            {
                await this.distibutedCache.RemoveAsync(key);
            }
            catch (Exception ex)
            {
                // Not in cache
                this.logger.LogError("BIADistributedCache.Remove Not in cache", ex);
            }
        }

        /// <summary>
        /// Convert an object to a Byte Array, using Protobuf.
        /// </summary>
        private byte[] ObjectToByteArray<T>(T obj)
        {
            if (obj == null)
                return null;

            using var stream = new MemoryStream();
            XmlSerializer xmlSerializer = new XmlSerializer(typeof(T));
            xmlSerializer.Serialize(stream, obj);

            return stream.ToArray();
        }

        /// <summary>
        /// Convert a byte array to an Object of T, using Protobuf.
        /// </summary>
        private T ByteArrayToObject<T>(byte[] arrBytes)
        {
            using var stream = new MemoryStream();

            // Ensure that our stream is at the beginning.
            stream.Write(arrBytes, 0, arrBytes.Length);
            stream.Seek(0, SeekOrigin.Begin);
            XmlSerializer xmlSerializer = new XmlSerializer(typeof(T));
            return (T)xmlSerializer.Deserialize(stream);
        }

    }
}
