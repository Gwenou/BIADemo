﻿// <copyright file="ITGenericRepository.cs" company="BIA">
//     Copyright (c) BIA. All rights reserved.
// </copyright>

namespace BIA.Net.Core.Domain.RepoContract
{
    using BIA.Net.Core.Common;
    using BIA.Net.Core.Domain.QueryOrder;
    using BIA.Net.Core.Domain.RepoContract.QueryCustomizer;
    using BIA.Net.Core.Domain.Specification;
    using System;
    using System.Collections.Generic;
    using System.Linq.Expressions;
    using System.Threading.Tasks;

    /// <summary>
    /// The interface base for IGenericRepository.
    /// </summary>
    /// <typeparam name="TEntity">The entity type.</typeparam>

    public interface ITGenericRepository<TEntity, TKey> where TEntity : class, IEntity<TKey>
    {
        /// <summary>
        /// Get or set the Query customizer.
        /// </summary>
        IQueryCustomizer<TEntity> QueryCustomizer { get; set; }

        /// <summary>
        /// Gets the unit of work.
        /// </summary>
        IUnitOfWork UnitOfWork { get; }

        /// <summary>
        /// Add an item to the current context.
        /// </summary>
        /// <param name="item">The item.</param>
        void Add(TEntity item);

        /// <summary>
        /// Add a list of item to the current context.
        /// </summary>
        /// <param name="items">The items.</param>
        void AddRange(IEnumerable<TEntity> items);

        /// <summary>
        /// Check if any element check rules.
        /// </summary>
        /// <param name="specification">The specification.</param>
        /// <returns>A value indicating whether at least one element match with condition.</returns>
        Task<bool> AnyAsync(Specification<TEntity> specification);

        /// <summary>
        /// Get All Elements.
        /// </summary>
        /// <param name="id">The id.</param>
        /// <param name="specification">Specification Used to filter query.</param>
        /// <param name="filter">Filter Query.</param>
        /// <param name="queryOrder">Order the Query.</param>
        /// <param name="firstElement">First element to take.</param>
        /// <param name="pageCount">Number of elements in each page.</param>
        /// <param name="includes">The list of includes.</param>
        /// <param name="queryMode">Mode of the query (optionnal).</param>
        /// <returns>All TEntity.</returns>
        Task<IEnumerable<TEntity>> GetAllEntityAsync(TKey id = default, Specification<TEntity> specification = null, Expression<Func<TEntity, bool>> filter = null, QueryOrder<TEntity> queryOrder = null, int firstElement = 0, int pageCount = 0, Expression<Func<TEntity, object>>[] includes = null, string queryMode = null);

        /// <summary>
        /// Get All Elements Ordered By.
        /// </summary>
        /// <typeparam name="TOrderKey">Type of Ordered Field.</typeparam>
        /// <param name="orderByExpression">Ordered Expression.</param>
        /// <param name="ascending">Direction of sort.</param>
        /// <param name="specification">Specification Used to filter query.</param>
        /// <param name="filter">Filter Query.</param>
        /// <param name="firstElement">First element to take.</param>
        /// <param name="pageCount">Number of elements in each page.</param>
        /// <param name="includes">The list of includes.</param>
        /// <param name="queryMode">Mode of the query (optionnal).</param>
        /// <returns>List of Elements.</returns>
        Task<IEnumerable<TEntity>> GetAllEntityAsync<TOrderKey>(Expression<Func<TEntity, TOrderKey>> orderByExpression, bool ascending, TKey id = default, Specification<TEntity> specification = null, Expression<Func<TEntity, bool>> filter = null, int firstElement = 0, int pageCount = 0, Expression<Func<TEntity, object>>[] includes = null, string queryMode = null);

        /// <summary>
        /// Gets the by spec and count.
        /// </summary>
        /// <typeparam name="TResult">The type of the result.</typeparam>
        /// <param name="selectResult">Lambda Expression for Select on query.</param>
        /// <param name="id">The id.</param>
        /// <param name="specification">Specification Used to filter query.</param>
        /// <param name="filter">Filter Query.</param>
        /// <param name="queryOrder">Order the Query.</param>
        /// <param name="firstElement">First element to take.</param>
        /// <param name="pageCount">Number of elements in each page.</param>
        /// <param name="includes">The list of includes.</param>
        /// <param name="queryMode">Mode of the query (optionnal).</param>
        /// <returns>List of Elements with selected Columns of Entity Object and count.</returns>
        Task<Tuple<IEnumerable<TResult>, int>> GetRangeResultAsync<TResult>(Expression<Func<TEntity, TResult>> selectResult, TKey id = default, Specification<TEntity> specification = null, Expression<Func<TEntity, bool>> filter = null, QueryOrder<TEntity> queryOrder = null, int firstElement = 0, int pageCount = 0, Expression<Func<TEntity, object>>[] includes = null, string queryMode = null);

        /// <summary>
        /// Get Elements with selected Columns of Entity By Specification Pattern, with Ordering and Includes.
        /// </summary>
        /// <typeparam name="TOrderKey">Type of Ordering.</typeparam>
        /// <typeparam name="TResult">Type of Selected return.</typeparam>
        /// <param name="selectResult">Lambda Expression for Select on query.</param>
        /// <param name="orderByExpression">Lambda Expression for Ordering Query.</param>
        /// <param name="ascending">Direction of Ordering.</param>
        /// <param name="id">The id.</param>
        /// <param name="specification">Specification Used for Filtering Query.</param>
        /// <param name="filter">Filter Query.</param>
        /// <param name="firstElement">First element to take.</param>
        /// <param name="pageCount">Number of elements in each page.</param>
        /// <param name="ascending">Direction of Ordering.</param>
        /// <param name="queryMode">Mode of the query (optionnal).</param>
        /// <param name="includes">The list of includes.</param>
        /// <returns>List of Elements with selected Columns of Entity Object.</returns>
        Task<IEnumerable<TResult>> GetAllResultAsync<TOrderKey, TResult>(Expression<Func<TEntity, TResult>> selectResult, Expression<Func<TEntity, TOrderKey>> orderByExpression, bool ascending, TKey id = default, Specification<TEntity> specification = null, Expression<Func<TEntity, bool>> filter = null, int firstElement = 0, int pageCount = 0, Expression<Func<TEntity, object>>[] includes = null, string queryMode = null);

        /// <summary>
        /// Gets the by spec and count.
        /// </summary>
        /// <typeparam name="TResult">The type of the result.</typeparam>
        /// <param name="selectResult">Lambda Expression for Select on query.</param>
        /// <param name="id">The id.</param>
        /// <param name="specification">Specification Used to filter query.</param>
        /// <param name="filter">Filter Query.</param>
        /// <param name="queryOrder">Order the Query.</param>
        /// <param name="firstElement">First element to take.</param>
        /// <param name="pageCount">Number of elements in each page.</param>
        /// <param name="includes">The list of includes.</param>
        /// <param name="queryMode">Mode of the query (optionnal).</param>
        /// <returns>List of Elements with selected Columns of Entity Object and count.</returns>
        Task<IEnumerable<TResult>> GetAllResultAsync<TResult>(Expression<Func<TEntity, TResult>> selectResult, TKey id = default, Specification<TEntity> specification = null, Expression<Func<TEntity, bool>> filter = null, QueryOrder<TEntity> queryOrder = null, int firstElement = 0, int pageCount = 0, Expression<Func<TEntity, object>>[] includes = null, string queryMode = null);

        /// <summary>
        /// Get an entity with it's identifier.
        /// </summary>
        /// <param name="id">The id.</param>
        /// <param name="specification">Additionnal filter.</param>
        /// <param name="filter">Filter Query.</param>
        /// <param name="includes">The list of includes.</param>
        /// <param name="queryMode">Mode of the query (optionnal).</param>
        /// <returns>The <see cref="TEntity"/>.</returns>

        Task<TEntity> GetEntityAsync(TKey id = default, Specification<TEntity> specification = null, Expression<Func<TEntity, bool>> filter = null, Expression<Func<TEntity, object>>[] includes = null, string queryMode = null);

        /// <summary>
        /// Get a dto with it's identifier.
        /// </summary>
        /// <typeparam name="TResult">Type of Selected return.</typeparam>
        /// <param name="selectResult">Lambda Expression for Select on query.</param>
        /// <param name="id">The id.</param>
        /// <param name="specification">Additionnal filter.</param>
        /// <param name="filter">Filter Query.</param>
        /// <param name="includes">The list of includes.</param>
        /// <param name="queryMode">Mode of the query (optionnal).</param>
        Task<TResult> GetResultAsync<TResult>(Expression<Func<TEntity, TResult>> selectResult, TKey id = default, Specification<TEntity> specification = null, Expression<Func<TEntity, bool>> filter = null, Expression<Func<TEntity, object>>[] includes = null, string queryMode = null);
        
        /// <summary>
        /// Remove an item to the current context.
        /// </summary>
        /// <param name="item">The item.</param>
        void Remove(TEntity item);

        /// <summary>
        /// Set an item as modified in the current context to force update of all fields 
        /// > it is not recommanded to use it because it do additionnal job in database and Audit will track too much change.
        /// </summary>
        /// <typeparam name="TEntity">The entity type.</typeparam>
        /// <param name="item">The item.</param>
        void SetModified(TEntity item);
    }
}