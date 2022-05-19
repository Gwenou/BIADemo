﻿// <copyright file="TokenConf.cs" company="BIA">
// Copyright (c) BIA. All rights reserved.
// </copyright>

namespace BIA.Net.Core.Common.Configuration.Keycloak
{
    /// <summary>
    /// Keycloak TokenConf.
    /// </summary>
    public class TokenConf
    {
        /// <summary>
        /// Gets or sets the URL.
        /// </summary>
        public string Url { get; set; }

        /// <summary>
        /// Gets or sets the client identifier.
        /// </summary>
        public string ClientId { get; set; }

        /// <summary>
        /// Gets or sets the type of the grant.
        /// </summary>
        public string GrantType { get; set; }

        /// <summary>
        /// Gets or sets the credential key in windows vault.
        /// </summary>
        public string CredentialKeyInWindowsVault { get; set; }
    }
}
