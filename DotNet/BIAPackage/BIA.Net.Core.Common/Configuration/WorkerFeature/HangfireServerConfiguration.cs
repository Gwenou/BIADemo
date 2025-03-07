﻿using System;
using System.Collections.Generic;
using System.Text;

namespace BIA.Net.Core.Common.Configuration.WorkerFeature
{
    public class HangfireServerConfiguration
    {
        /// <summary>
        /// Boolean to activate the feature DatabaseHandler.
        /// </summary>
        public bool IsActive { get; set; }

        /// <summary>
        /// Hangfire name of the server.
        /// </summary>
        public string ServerName { get; set; }

        /// <summary>
        /// Connexion string name for the database.
        /// </summary>
        public string ConnectionStringName { get; set; }

        public HangfireServerConfiguration()
        {
            this.IsActive = false;
        }
    }
}
