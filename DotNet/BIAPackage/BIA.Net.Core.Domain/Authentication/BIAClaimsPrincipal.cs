﻿// <copyright file="BIAClaimsPrincipal.cs" company="BIA">
//     Copyright (c) BIA.Net. All rights reserved.
// </copyright>
namespace BIA.Net.Core.Domain.Authentication
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Security.Claims;
    using BIA.Net.Core.Common.Helpers;
    using Newtonsoft.Json;

    /// <summary>
    /// A <see cref="ClaimsPrincipal"/> implementation with additional utility methods.
    /// </summary>
    /// <seealso cref="ClaimsPrincipal" />
#pragma warning disable S101 // Types should be named in PascalCase
    public class BIAClaimsPrincipal : ClaimsPrincipal
#pragma warning restore S101 // Types should be named in PascalCase
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="BIAClaimsPrincipal"/> class.
        /// </summary>
        public BIAClaimsPrincipal()
        {
            // Do nothing.
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="BIAClaimsPrincipal"/> class from the given <see cref="ClaimsPrincipal"/>.
        /// </summary>
        /// <param name="principal">The base principal.</param>
        public BIAClaimsPrincipal(ClaimsPrincipal principal)
            : base(principal)
        {
            // Do nothing.
        }

        /// <summary>
        /// Get the user identifier in the claims.
        /// </summary>
        /// <returns>The user identifier.</returns>
        public virtual int GetUserId()
        {
            if (!this.HasClaim(x => x.Type == ClaimTypes.Sid))
            {
                return 0;
            }

            var userId = this.FindFirst(x => x.Type == ClaimTypes.Sid).Value;
            int.TryParse(userId, out int result);

            return result;
        }

        /// <summary>
        /// Get the user login in the claims.
        /// </summary>
        /// <returns>The user login.</returns>
        public virtual string GetUserLogin()
        {
            return this.GetClaimValue(ClaimTypes.Name);
        }

        /// <summary>
        /// Gets list of groups where the user is a member.
        /// </summary>
        /// <returns>List of groups.</returns>
        public virtual IEnumerable<string> GetGroups()
        {
            return this.GetClaimValues(CustomClaimTypes.Group);
        }

        /// <summary>
        /// Get the user roles in the claims.
        /// This method is used to retrieve the roles contained in the token provided by the IdP.
        /// </summary>
        /// <returns>The user roles.</returns>
        public virtual IEnumerable<string> GetRoles()
        {
            return this.GetClaimValues(ClaimTypes.Role);
        }

        /// <summary>
        /// Get the user rights in the claims.
        /// This method is called GetUserPermissions while we retrieve the roles. Because we use this claim to store the permissions in the application token.
        /// </summary>
        /// <returns>The user rights.</returns>
        public virtual IEnumerable<string> GetUserPermissions()
        {
            return this.GetClaimValues(ClaimTypes.Role);
        }

        /// <summary>
        /// Gets the user data in the claims.
        /// </summary>
        /// <typeparam name="T">Type of data we want to retrieve.</typeparam>
        /// <returns>the user data object.</returns>
        public virtual T GetUserData<T>()
        {
            if (!this.HasClaim(x => x.Type == ClaimTypes.UserData))
            {
                return default;
            }

            string json = this.FindFirst(x => x.Type == ClaimTypes.UserData).Value;

            if (string.IsNullOrWhiteSpace(json))
            {
                return default;
            }

            return JsonConvert.DeserializeObject<T>(json);
        }
    }
}
