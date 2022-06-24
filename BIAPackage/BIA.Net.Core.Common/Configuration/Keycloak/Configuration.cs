﻿// <copyright file="Configuration.cs" company="BIA">
// Copyright (c) BIA. All rights reserved.
// </copyright>

namespace BIA.Net.Core.Common.Configuration.Keycloak
{
    /// <summary>
    /// Keycloak Configuration.
    /// </summary>
    public class Configuration
    {
        /// <summary>
        /// Gets or sets the authority.
        /// </summary>
        public string Authority { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether [require HTTPS metadata].
        /// </summary>
        public bool RequireHttpsMetadata { get; set; }

        /// <summary>
        /// Gets or sets the valid audience.
        /// </summary>
        public string ValidAudience { get; set; }
    }
}
