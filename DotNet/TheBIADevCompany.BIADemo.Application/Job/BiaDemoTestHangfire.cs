// BIADemo only
// <copyright file="BiaDemoTestHangfire.cs" company="TheBIADevCompany">
//     Copyright (c) TheBIADevCompany. All rights reserved.
// </copyright>
namespace TheBIADevCompany.BIADemo.Application.Job
{
    using System;
    using System.Threading.Tasks;
    using BIA.Net.Core.Application.Job;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.Logging;

    /// <summary>
    /// Sample class to use a hangfire task.
    /// </summary>
    public class BiaDemoTestHangfire : BaseJob
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="BiaDemoTestHangfire"/> class.
        /// </summary>
        /// <param name="configuration">The configuration.</param>
        /// <param name="logger">logger.</param>
        public BiaDemoTestHangfire(IConfiguration configuration, ILogger<BiaDemoTestHangfire> logger)
            : base(configuration, logger)
        {
        }

        /// <summary>
        /// Run the processes that are waiting.
        /// </summary>
        /// <returns>The <see cref="Task"/> representing the operation to perform.</returns>
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        protected override async Task RunMonitoredTask()
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            this.Logger.LogInformation($"{DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss")}: BiaDemoTestHangfire => This log is generated by a hangfire task");
        }
    }
}