﻿// <copyright file="BIAIocContainerTest.cs" company="BIA">
//     Copyright (c) BIA.Net. All rights reserved.
// </copyright>
namespace BIA.Net.Core.Test.IoC
{
    using BIA.Net.Core.Domain.Authentication;
    using BIA.Net.Core.Domain.RepoContract;
    using BIA.Net.Core.Infrastructure.Data;
    using BIA.Net.Core.Infrastructure.Data.Repositories;
    using BIA.Net.Core.Presentation.Common.Features.HubForClients;
    using Microsoft.AspNetCore.SignalR;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.DependencyInjection;
    using Moq;
    using System;
    using System.Security.Principal;

    /// <summary>
    /// IoC container used for unit tests.
    /// </summary>
    public static class BIAIocContainerTest
    {
        static Mock<IHubClients> mockClients;
        static Mock<IClientProxy> mockClientProxy;
        static Mock<IHubContext<HubForClients>> hubContext;


        /// <summary>
        /// The method used to register all instances for unit test purposes.
        /// </summary>
        /// <param name="services">The collection of services to update.</param>
        public static void ConfigureContainerTest<TDbContext, TDbContextReadOnly>(IServiceCollection services)
            where TDbContext : DbContext, IQueryableUnitOfWork
            where TDbContextReadOnly : DbContext, IQueryableUnitOfWorkReadOnly
        {
            services.AddLogging();

            ConfigureInfrastructureDataContainerTest<TDbContext, TDbContextReadOnly>(services);
            ConfigureInfrastructureServiceContainerTest(services);


        }

        /// <summary>
        /// Configure the database IoC.
        /// </summary>
        /// <param name="services">The collection of services to update.</param>
        public static void ConfigureInfrastructureDataContainerTest<TDbContext, TDbContextReadOnly>(IServiceCollection services)
            where TDbContext : DbContext, IQueryableUnitOfWork
              where TDbContextReadOnly : DbContext, IQueryableUnitOfWorkReadOnly
        {
            services.AddDbContext<IQueryableUnitOfWork, TDbContext>(
                options =>
                {
                    options.UseInMemoryDatabase(Guid.NewGuid().ToString());
                    options.EnableSensitiveDataLogging();
                });

            services.AddDbContext<IQueryableUnitOfWorkReadOnly, TDbContextReadOnly>(
               options =>
               {
                   options.UseInMemoryDatabase(Guid.NewGuid().ToString());
                   options.EnableSensitiveDataLogging();
               }, contextLifetime: ServiceLifetime.Transient);

            services.AddScoped(typeof(ITGenericRepository<,>), typeof(TGenericRepositoryEF<,>));
        }

        /// <summary>
        /// Configure the database IoC.
        /// </summary>
        /// <param name="services">The collection of services to update.</param>
        public static void ConfigureInfrastructureServiceContainerTest(IServiceCollection services)
        {
            mockClients = new Mock<IHubClients>();
            mockClientProxy = new Mock<IClientProxy>();
            mockClients.Setup(clients => clients.All).Returns(mockClientProxy.Object);
            hubContext = new Mock<IHubContext<HubForClients>>();
            hubContext.Setup(x => x.Clients).Returns(() => mockClients.Object);

            services.AddSingleton(hubContext.Object);
        }

        /// <summary>
        /// Apply the given principal mock to the dependency injection system.
        /// </summary>
        /// <param name="services">The collection of services to update.</param>
        /// <param name="principal">The principal mock to apply.</param>
        public static void ApplyPrincipalMock(IServiceCollection services, BIAClaimsPrincipal principal)
        {
            services.AddTransient<IPrincipal>(p => principal);
        }
    }
}
