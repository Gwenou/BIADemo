// <copyright file="IocContainerTest.cs" company="TheBIADevCompany">
//     Copyright (c) TheBIADevCompany. All rights reserved.
// </copyright>
namespace TheBIADevCompany.BIADemo.Test.IoC
{
    using BIA.Net.Core.Test.Data;
    using BIA.Net.Core.Test.IoC;
    using Microsoft.Extensions.DependencyInjection;
    using TheBIADevCompany.BIADemo.Crosscutting.Ioc;
    using TheBIADevCompany.BIADemo.Infrastructure.Data;

    // Begin BIADemo
    using TheBIADevCompany.BIADemo.Presentation.Api.Controllers.Plane;

    // End BIADemo
    using TheBIADevCompany.BIADemo.Presentation.Api.Controllers.Site;
    using TheBIADevCompany.BIADemo.Presentation.Api.Controllers.User;
    using TheBIADevCompany.BIADemo.Presentation.Api.Controllers.View;
    using TheBIADevCompany.BIADemo.Test.Data;

    /// <summary>
    /// Specific IoC container used for unit tests.
    ///
    /// Note: Add IoC for components specific to your project in <see cref="ConfigureContainerTest(IServiceCollection)"/> method.
    /// </summary>
    /// <seealso cref="BIAIocContainerTest"/>
    /// <seealso cref="IocContainer"/>
    public static class IocContainerTest
    {
        /// <summary>
        /// Method used to register all instances for unit test purposes.
        ///
        /// Note: Add IoC for components specific to your project in this method.
        /// </summary>
        /// <param name="services">The collection of services to update.</param>
        public static void ConfigureContainerTest(IServiceCollection services)
        {
            IocContainer.ConfigureContainer(services, null, true);
            BIAIocContainerTest.ConfigureContainerTest<DataContext, DataContextReadOnly>(services);

            services.AddTransient<IMockEntityFramework<DataContext, DataContextReadOnly>, MockEntityFrameworkInMemory>();

            ConfigureControllerContainer(services);
        }

        /// <summary>
        /// Configure dependency injection for all controllers.
        /// </summary>
        /// <param name="services">The collection of services to update.</param>
        private static void ConfigureControllerContainer(IServiceCollection services)
        {
            // Application Layer
            services.AddTransient<SitesController, SitesController>();
            services.AddTransient<MembersController, MembersController>();
            services.AddTransient<RolesController, RolesController>();
            services.AddTransient<UsersController, UsersController>();
            services.AddTransient<ViewsController, ViewsController>();

            // Begin BIADemo
            services.AddTransient<PlanesController, PlanesController>();

            // End BIADemo
        }
    }
}
