// BIADemo only
// <copyright file="NotificationHandlerRepository.cs" company="TheBIADevCompany">
//     Copyright (c) BIA.Net. All rights reserved.
// </copyright>

namespace TheBIADevCompany.BIADemo.WorkerService.Features
{
    using System.Data.SqlClient;
    using System.Threading.Tasks;
    using BIA.Net.Core.WorkerService.Features.ClientForHub;
    using BIA.Net.Core.WorkerService.Features.DataBaseHandler;
    using Microsoft.Extensions.Configuration;
    using Newtonsoft.Json;

    /// <summary>
    /// Example for handler repository: a signalR event is send to client when something change in the Notification Table.
    /// </summary>
    public class NotificationHandlerRepository : DatabaseHandlerRepository
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="NotificationHandlerRepository"/> class.
        /// Constructor Set the trigger request.
        /// </summary>
        /// <param name="configuration">the project configuration.</param>
        public NotificationHandlerRepository(IConfiguration configuration)
            : base(
            configuration.GetConnectionString("BIADemoDatabase"),
            "SELECT RowVersion FROM [dbo].[Notification]",
            "SELECT TOP 1 [Id], [Title], [Description], (SELECT COUNT(*) FROM dbo.Notification WHERE Notification.[Read] = 0) as UnreadCount FROM [dbo].[Notification] ORDER BY [RowVersion] DESC",
            async r => await NotificationChange(r))
        {
        }

        /// <summary>
        /// Send message to the clients.
        /// </summary>
        /// <param name="reader">the reader use to retrieve info send by the trigger.</param>
        public static async Task NotificationChange(SqlDataReader reader)
        {
            var notification = new
            {
                id = reader.GetInt32(0),
                title = reader.GetString(1),
                description = reader.GetString(2),
                unreadCount = reader.GetInt32(3),
            };

            /* To read information use: int id = reader.GetInt32(0)  */
            _ = ClientForHubService.SendMessage("notification-sent", JsonConvert.SerializeObject(notification));
        }
    }
}
