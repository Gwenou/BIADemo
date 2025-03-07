﻿namespace BIA.Net.Core.Domain.RepoContract
{
    using System;

    public interface IUserFromDirectory
    {
        /// <summary>
        /// Gets or sets the login.
        /// </summary>
        public string Login { get; set; }

        /// <summary>
        /// Gets or sets the login.
        /// </summary>
        public string Domain { get; set; }

        /// <summary>
        /// Gets or sets the sid.
        /// </summary>
        public string Sid { get; set; }
    }
}
