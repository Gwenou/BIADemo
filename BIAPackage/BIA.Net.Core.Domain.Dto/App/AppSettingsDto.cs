﻿// <copyright file="OptionDto.cs" company="BIA">
//     BIA. All rights reserved.
// </copyright>

namespace BIA.Net.Core.Domain.Dto.Option
{
    using BIA.Net.Core.Common.Configuration;
    using BIA.Net.Core.Domain.Dto.Base;
    using System.Collections.Generic;

    /// <summary>
    /// The DTO used to represent a airport.
    /// </summary>
    public class AppSettingsDto : BaseDto
    {
        /// <summary>
        /// Gets or sets the authentication configuration.
        /// </summary>
        public EnvironmentConfiguration Environment { get; set; }

        /// <summary>
        /// Gets or sets the cultures configuration.
        /// </summary>
        public IEnumerable<Culture> Cultures { get; set; }
    }
}
