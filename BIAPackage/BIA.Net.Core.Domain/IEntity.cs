﻿// <copyright file="IEntity.cs" company="BIA">
//     Copyright (c) BIA. All rights reserved.
// </copyright>

namespace BIA.Net.Core.Domain
{
    /// <summary>
    /// The interface base for entity.
    /// </summary>
    public interface IEntity<TKey>
    {
        /// <summary>
        /// Gets or sets the identifier.
        /// </summary>
        TKey Id { get; set; }
    }
}