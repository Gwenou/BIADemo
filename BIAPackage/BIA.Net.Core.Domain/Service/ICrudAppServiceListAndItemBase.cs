﻿// <copyright file="ICrudAppServiceBase.cs" company="BIA">
//     Copyright (c) BIA. All rights reserved.
// </copyright>

namespace BIA.Net.Core.Domain.Service
{
    using System;
    using System.Collections.Generic;
    using System.Linq.Expressions;
    using System.Threading.Tasks;
    using BIA.Net.Core.Domain;
    using BIA.Net.Core.Domain.Dto.Base;
    using BIA.Net.Core.Domain.QueryOrder;
    using BIA.Net.Core.Domain.RepoContract.QueryCustomizer;
    using BIA.Net.Core.Domain.Specification;

    /// <summary>
    /// The interface defining the CRUD methods.
    /// </summary>
    /// <typeparam name="TDto">The DTO type.</typeparam>
    /// <typeparam name="TFilterDto">The filter DTO type.</typeparam>
    public interface ICrudAppServiceListAndItemBase<TDto, TListItemDto, TEntity, TKey, TFilterDto>
        where TDto : BaseDto<TKey>, new()
        where TListItemDto : BaseDto<TKey>, new()
        where TEntity : class, IEntity<TKey>, new()
        where TFilterDto : LazyLoadDto, new()
    {
        /// <summary>
        /// Get the DTO list with paging and sorting.
        /// </summary>
        /// <param name="filters">The filters.</param>
        /// <param name="id">The id.</param>
        /// <param name="specification">Specification Used to filter query.</param>
        /// <param name="filter">Filter Query.</param>
        /// <param name="accessMode">Acces mode, filter on right (optionnal).</param>
        /// <param name="queryMode">Mode of the query (optionnal).</param>
        /// <returns>The list of DTO.</returns>
        Task<(IEnumerable<TListItemDto> Results, int Total)> GetRangeAsync(
            TFilterDto filters = null,
            int id = 0,
            Specification<TEntity> specification = null,
            Expression<Func<TEntity, bool>> filter = null,
            string accessMode = AccessMode.Read,
            string queryMode = QueryMode.ReadList,
            string mapperMode = null);

        /// <summary>
        /// Get the csv with other filter.
        /// </summary>
        /// <param name="filters">The filters.</param>
        /// <param name="id">The id.</param>
        /// <param name="specification">Specification Used to filter query.</param>
        /// <param name="filter">Filter Query.</param>
        /// <param name="accessMode">Acces mode, filter on right (optionnal).</param>
        /// <param name="queryMode">Mode of the query (optionnal).</param>
        /// <returns></returns>
        Task<byte[]> GetCsvAsync(
            TFilterDto filters = null,
            int id = 0,
            Specification<TEntity> specification = null,
            Expression<Func<TEntity, bool>> filter = null,
            string accessMode = AccessMode.Read,
            string queryMode = QueryMode.ReadList,
            string mapperMode = null
            );

        /// <summary>
        /// Get the csv with other filter.
        /// </summary>
        /// <param name="filters">The filters.</param>
        /// <param name="id">The id.</param>
        /// <param name="specification">Specification Used to filter query.</param>
        /// <param name="filter">Filter Query.</param>
        /// <param name="accessMode">Acces mode, filter on right (optionnal).</param>
        /// <param name="queryMode">Mode of the query (optionnal).</param>
        Task<byte[]> GetCsvAsync<TOtherFilter>(
            TOtherFilter filters,
            int id = 0,
            Specification<TEntity> specification = null,
            Expression<Func<TEntity, bool>> filter = null,
            string accessMode = AccessMode.Read,
            string queryMode = QueryMode.ReadList,
            string mapperMode = null
            )
             where TOtherFilter : LazyLoadDto, new();

        /// <summary>
        /// Get the DTO list.
        /// </summary>
        /// <param name="id">The id.</param>
        /// <param name="specification">Specification Used to filter query.</param>
        /// <param name="filter">Filter Query.</param>
        /// <param name="queryOrder">Order the Query.</param>
        /// <param name="firstElement">First element to take.</param>
        /// <param name="pageCount">Number of elements in each page.</param>
        /// <param name="includes">The list of includes.</param>
        /// <param name="accessMode">Acces mode, filter on right (optionnal).</param>
        /// <param name="queryMode">Mode of the query (optionnal).</param>
        /// <returns>The list of DTO.</returns>
        Task<IEnumerable<TListItemDto>> GetAllAsync(
            int id = 0,
            Specification<TEntity> specification = null,
            Expression<Func<TEntity, bool>> filter = null,
            QueryOrder<TEntity> queryOrder = null,
            int firstElement = 0,
            int pageCount = 0,
            Expression<Func<TEntity, object>>[] includes = null,
            string accessMode = AccessMode.Read,
            string queryMode = null,
            string mapperMode = null);

        /// <summary>
        /// Returns data in csv format.
        /// </summary>
        /// <param name="orderByExpression">Lambda Expression for Ordering Query.</param>
        /// <param name="ascending">Direction of Ordering.</param>
        /// <param name="id">The id.</param>
        /// <param name="specification">Specification Used for Filtering Query.</param>
        /// <param name="filter">Filter Query.</param>
        /// <param name="firstElement">First element to take.</param>
        /// <param name="pageCount">Number of elements in each page.</param>
        /// <param name="includes">The list of includes.</param>
        /// <param name="ascending">Direction of Ordering.</param>
        /// <param name="accessMode">Acces mode, filter on right (optionnal).</param>
        /// <param name="queryMode">Mode of the query (optionnal).</param>
        /// <returns>Data in csv format.</returns>
        Task<IEnumerable<TListItemDto>> GetAllAsync<TKey>(Expression<Func<TEntity, TKey>> orderByExpression, bool ascending,
            int id = 0,
            Specification<TEntity> specification = null,
            Expression<Func<TEntity, bool>> filter = null,
            int firstElement = 0,
            int pageCount = 0,
            Expression<Func<TEntity, object>>[] includes = null,
            string accessMode = AccessMode.Read,
            string queryMode = null,
            string mapperMode = null);

        /// <summary>
        /// Return a DTO for a given identifier.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <param name="specification">Specification Used for Filtering Query.</param>
        /// <param name="filter">Filter Query.</param>
        /// <param name="includes">The list of includes.</param>
        /// <param name="accessMode">Acces mode, filter on right (optionnal).</param>
        /// <param name="queryMode">Mode of the query (optionnal).</param>
        /// <returns>The DTO.</returns>
        Task<TDto> GetAsync(int id = 0,
            Specification<TEntity> specification = null,
            Expression<Func<TEntity, bool>> filter = null,
            Expression<Func<TEntity, object>>[] includes = null,
            string accessMode = AccessMode.Read,
            string queryMode = QueryMode.Read,
            string mapperMode = MapperMode.Item);

        /// <summary>
        /// Transform the DTO into the corresponding entity and add it to the DB.
        /// </summary>
        /// <param name="dto">The DTO.</param>
        /// <returns>The DTO with id updated.</returns>
        Task<TDto> AddAsync(TDto dto,
            string mapperMode = null);

        /// <summary>
        /// Update an entity in DB with the DTO values.
        /// </summary>
        /// <param name="dto">The DTO.</param>
        /// <returns>The DTO updated.</returns>
        Task<TDto> UpdateAsync(TDto dto, string accessMode = AccessMode.Update, string queryMode = QueryMode.Update,
            string mapperMode = null);

        /// <summary>
        /// Remove an entity with its identifier.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        Task RemoveAsync(int id, string accessMode = AccessMode.Delete, string queryMode = QueryMode.Delete);

        /// <summary>
        /// Save the DTO in DB regarding to theirs state.
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        Task SaveAsync(TDto dto,
            string accessMode = null,
            string queryMode = null,
            string mapperMode = null);

        /// <summary>
        /// Save the list of DTO in DB regarding to theirs state.
        /// </summary>
        /// <param name="dtos">The list of DTO to save.</param>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        Task SaveAsync(IEnumerable<TDto> dtos,
            string accessMode = null,
            string queryMode = null,
            string mapperMode = null);
    }
}