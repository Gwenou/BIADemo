// <copyright file="IMemberAppService.cs" company="TheBIADevCompany">
//     Copyright (c) TheBIADevCompany. All rights reserved.
// </copyright>

namespace TheBIADevCompany.BIADemo.Application.User
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using BIA.Net.Core.Domain.Dto.Base;
    using BIA.Net.Core.Domain.Service;
    using TheBIADevCompany.BIADemo.Domain.Dto.User;
    using TheBIADevCompany.BIADemo.Domain.UserModule.Aggregate;

    /// <summary>
    /// The interface defining the application service for member.
    /// </summary>
    public interface IMemberAppService : ICrudAppServiceBase<MemberDto, Member, LazyLoadDto>
    {
        /// <summary>
        /// Get the list of MemberDto with paging and sorting.
        /// </summary>
        /// <param name="filters">The filters.</param>
        /// <returns>The list of MemberDto.</returns>
        Task<(IEnumerable<MemberDto> Members, int Total)> GetRangeBySiteAsync(LazyLoadDto filters);

        /// <summary>
        /// Sets the default site.
        /// </summary>
        /// <param name="siteId">The site identifier.</param>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        Task SetDefaultSiteAsync(int siteId);

        /// <summary>
        /// Sets the default role.
        /// </summary>
        /// <param name="roleId">The role identifier.</param>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        Task SetDefaultRoleAsync(int roleId);

        /// <summary>
        /// Generates CSV content.
        /// </summary>
        /// <param name="filters">Represents the columns and their traductions.</param>
        /// <returns>A <see cref="Task"/> holding the buffered data to return in a file.</returns>
        Task<byte[]> ExportCSV(LazyLoadDto filters);
    }
}