// BIADemo only
// <copyright file="AircraftMaintenanceCompanyAppService.cs" company="TheBIADevCompany">
//     Copyright (c) TheBIADevCompany. All rights reserved.
// </copyright>

namespace TheBIADevCompany.BIADemo.Application.AircraftMaintenanceCompany
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Security.Principal;
    using System.Threading.Tasks;
    using BIA.Net.Core.Domain.Authentication;
    using BIA.Net.Core.Domain.Dto.Base;
    using BIA.Net.Core.Domain.Dto.User;
    using BIA.Net.Core.Domain.RepoContract;
    using BIA.Net.Core.Domain.Service;
    using BIA.Net.Core.Domain.Specification;
    using TheBIADevCompany.BIADemo.Crosscutting.Common;
    using TheBIADevCompany.BIADemo.Crosscutting.Common.Enum;
    using TheBIADevCompany.BIADemo.Domain.AircraftMaintenanceCompanyModule.Aggregate;
    using TheBIADevCompany.BIADemo.Domain.Dto.AircraftMaintenanceCompany;

    /// <summary>
    /// The application service used for AircraftMaintenanceCompany.
    /// </summary>
    public class AircraftMaintenanceCompanyAppService : CrudAppServiceBase<AircraftMaintenanceCompanyDto, AircraftMaintenanceCompany, int, PagingFilterFormatDto, AircraftMaintenanceCompanyMapper>, IAircraftMaintenanceCompanyAppService
    {
        /// <summary>
        /// The current AircraftMaintenanceCompany Id.
        /// </summary>
        private readonly int currentAircraftMaintenanceCompanyId;

        /// <summary>
        /// Initializes a new instance of the <see cref="AircraftMaintenanceCompanyAppService"/> class.
        /// </summary>
        /// <param name="repository">The repository.</param>
        /// <param name="principal">The claims principal.</param>
        public AircraftMaintenanceCompanyAppService(ITGenericRepository<AircraftMaintenanceCompany, int> repository, IPrincipal principal)
            : base(repository)
        {
            var userData = (principal as BIAClaimsPrincipal).GetUserData<UserDataDto>();
            this.currentAircraftMaintenanceCompanyId = userData != null ? userData.GetCurrentTeamId((int)TeamTypeId.AircraftMaintenanceCompany) : 0;

            IEnumerable<string> currentUserPermissions = (principal as BIAClaimsPrincipal).GetUserPermissions();
            bool accessAll = currentUserPermissions?.Any(x => x == Rights.Teams.AccessAll) == true;
            int userId = (principal as BIAClaimsPrincipal).GetUserId();

            this.filtersContext.Add(
                AccessMode.Read,
                new DirectSpecification<AircraftMaintenanceCompany>(p => accessAll || p.Members.Any(m => m.UserId == userId))
            );
            this.filtersContext.Add(
                AccessMode.Update,
                new DirectSpecification<AircraftMaintenanceCompany>(p => p.Id == this.currentAircraftMaintenanceCompanyId)
            );
        }
    }
}