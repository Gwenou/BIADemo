// <copyright file="MapperServiceBase.cs" company="BIA">
//     Copyright (c) BIA. All rights reserved.
// </copyright>

namespace BIA.Net.Core.Domain.Service
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using System.Transactions;
    using BIA.Net.Core.Common;
    using BIA.Net.Core.Common.Exceptions;
    using BIA.Net.Core.Domain;
    using BIA.Net.Core.Domain.RepoContract;
    using BIA.Net.Core.Domain.Dto;
    using BIA.Net.Core.Domain.Dto.Base;
    using BIA.Net.Core.Domain.QueryOrder;
    using BIA.Net.Core.Domain.Specification;
    using BIA.Net.Core.Domain.RepoContract.QueryCustomizer;
    using System.Linq.Expressions;
    using System;


    /// <summary>
    /// The base class for all CRUD application service.
    /// </summary>
    /// <typeparam name="TEntity">The entity type.</typeparam>
    public abstract class FilteredServiceBase<TEntity, TKey> : AppServiceBase<TEntity, TKey>, IFilteredServiceBase<TEntity, TKey>
        where TEntity : class, IEntity<TKey>, new()
    {
        /// <summary>
        /// The filters
        /// </summary>
        protected Dictionary<string, Specification<TEntity>> filtersContext;

        /// <summary>
        /// Initializes a new instance of the <see
        /// cref="FilteredServiceBase{TEntity}"/> class.
        /// </summary>
        /// <param name="repository">The repository.</param>
        protected FilteredServiceBase(ITGenericRepository<TEntity, TKey> repository)
            : base(repository)
        {
            this.filtersContext = new Dictionary<string, Specification<TEntity>>();
        }

        /// <summary>
        /// Get the DTO list with paging and sorting.
        /// </summary>
        /// <typeparam name="TOtherDto">The type of DTO.</typeparam>
        /// <typeparam name="TOtherMapper">The type of Mapper entity to Dto.</typeparam>
        /// <param name="filters">The filters.</param>
        /// <param name="id">The id.</param>
        /// <param name="specification">Specification Used to filter query.</param>
        /// <param name="filter">Filter Query.</param>
        /// <param name="accessMode">The acces Mode (Read, Write delete, all ...). It take the corresponding filter.</param>
        /// <param name="queryMode">The queryMode use to customize query (repository functions CustomizeQueryBefore and CustomizeQueryAfter)</param>
        /// <param name="mapperMode">A string to adapt the mapper function DtoToEntity.</param>
        /// <returns>The list of DTO.</returns>
        public virtual async Task<(IEnumerable<TOtherDto> results, int total)> GetRangeAsync<TOtherDto, TOtherMapper, TOtherFilterDto>(
            TOtherFilterDto filters = null,
            TKey id = default,
            Specification<TEntity> specification = null,
            Expression<Func<TEntity, bool>> filter = null,
            string accessMode = AccessMode.Read,
            string queryMode = QueryMode.ReadList,
            string mapperMode = null,
            bool isReadOnlyMode = false)
            where TOtherMapper : BaseMapper<TOtherDto, TEntity, TKey>, new()
            where TOtherDto : BaseDto<TKey>, new()
            where TOtherFilterDto : LazyLoadDto, new()
        {
            TOtherMapper mapper = InitMapper<TOtherDto, TOtherMapper>();

            var spec = SpecificationHelper.GetLazyLoad<TEntity, TKey, TOtherMapper>(
                GetFilterSpecification(accessMode, filtersContext) & specification,
                mapper,
                filters);

            var queryOrder = this.GetQueryOrder(mapper.ExpressionCollection, filters?.SortField, filters?.SortOrder == 1);

            var results = await this.Repository.GetRangeResultAsync(
                mapper.EntityToDto(mapperMode),
                id: id,
                specification: spec,
                filter: filter,
                queryOrder: queryOrder,
                firstElement: filters?.First ?? 0,
                pageCount: filters?.Rows ?? 0,
                queryMode: queryMode, isReadOnlyMode: isReadOnlyMode);

            return (results.Item1.ToList(), results.Item2);
        }

        /// <summary>
        /// Get the DTO list. (with a queryOrder)
        /// </summary>
        /// <typeparam name="TOtherDto">The type of DTO.</typeparam>
        /// <typeparam name="TOtherMapper">The type of Mapper entity to Dto.</typeparam>
        /// <param name="id">The id.</param>
        /// <param name="specification">Specification Used to filter query.</param>
        /// <param name="filter">Filter Query.</param>
        /// <param name="queryOrder">Order the Query.</param>
        /// <param name="firstElement">First element to take.</param>
        /// <param name="pageCount">Number of elements in each page.</param>
        /// <param name="includes">The list of includes.</param>
        /// <param name="accessMode">The acces Mode (Read, Write delete, all ...). It take the corresponding filter.</param>
        /// <param name="queryMode">The queryMode use to customize query (repository functions CustomizeQueryBefore and CustomizeQueryAfter)</param>
        /// <param name="mapperMode">A string to adapt the mapper function DtoToEntity.</param>
        public async Task<IEnumerable<TOtherDto>> GetAllAsync<TOtherDto, TOtherMapper>(
            TKey id = default,
            Specification<TEntity> specification = null,
            Expression<Func<TEntity, bool>> filter = null,
            QueryOrder<TEntity> queryOrder = null,
            int firstElement = 0,
            int pageCount = 0,
            Expression<Func<TEntity, object>>[] includes = null,
            string accessMode = AccessMode.Read,
            string queryMode = null,
            string mapperMode = null,
            bool isReadOnlyMode = false)
            where TOtherMapper : BaseMapper<TOtherDto, TEntity, TKey>, new()
            where TOtherDto : BaseDto<TKey>, new()
        {
            TOtherMapper mapper = InitMapper<TOtherDto, TOtherMapper>();
            return await this.Repository.GetAllResultAsync(
                selectResult: mapper.EntityToDto(mapperMode),
                id: id,
                specification: GetFilterSpecification(accessMode, filtersContext) & specification,
                filter: filter,
                queryOrder: queryOrder,
                firstElement: firstElement,
                pageCount: pageCount,
                includes: includes,
                queryMode: queryMode, isReadOnlyMode: isReadOnlyMode
                );
        }

        /// <summary>
        /// Get the DTO list. (with an order By Expression and direction)
        /// </summary>
        /// <typeparam name="TOtherDto">The type of DTO.</typeparam>
        /// <typeparam name="TOtherMapper">The type of Mapper entity to Dto.</typeparam>
        /// <typeparam name="TKey">The type of key to sort.</typeparam>
        /// <param name="orderByExpression">Lambda Expression for Ordering Query.</param>
        /// <param name="ascending">Direction of Ordering.</param>
        /// <param name="id">The id.</param>
        /// <param name="specification">Specification Used for Filtering Query.</param>
        /// <param name="filter">Filter Query.</param>
        /// <param name="firstElement">First element to take.</param>
        /// <param name="pageCount">Number of elements in each page.</param>
        /// <param name="includes">The list of includes.</param>
        /// <param name="ascending">Direction of Ordering.</param>
        /// <param name="accessMode">The acces Mode (Read, Write delete, all ...). It take the corresponding filter.</param>
        /// <param name="queryMode">The queryMode use to customize query (repository functions CustomizeQueryBefore and CustomizeQueryAfter)</param>
        /// <param name="mapperMode">A string to adapt the mapper function DtoToEntity.</param>
        public async Task<IEnumerable<TOtherDto>> GetAllAsync<TOtherDto, TOtherMapper>(Expression<Func<TEntity, TKey>> orderByExpression, bool ascending,
            TKey id = default,
            Specification<TEntity> specification = null,
            Expression<Func<TEntity, bool>> filter = null,
            int firstElement = 0,
            int pageCount = 0,
            Expression<Func<TEntity, object>>[] includes = null,
            string accessMode = AccessMode.Read,
            string queryMode = null,
            string mapperMode = null,
            bool isReadOnlyMode = false)
            where TOtherMapper : BaseMapper<TOtherDto, TEntity, TKey>, new()
            where TOtherDto : BaseDto<TKey>, new()
        {
            TOtherMapper mapper = InitMapper<TOtherDto, TOtherMapper>();
            return await this.Repository.GetAllResultAsync(
                mapper.EntityToDto(mapperMode),
                orderByExpression,
                ascending,
                id: id,
                specification: GetFilterSpecification(accessMode, filtersContext) & specification,
                filter: filter,
                firstElement: firstElement,
                pageCount: pageCount,
                includes: includes,
                queryMode: queryMode, isReadOnlyMode: isReadOnlyMode
                );
        }

        public virtual async Task<byte[]> GetCsvAsync<TOtherDto, TOtherMapper, TOtherFilterDto>(
            TOtherFilterDto filters = null,
            TKey id = default,
            Specification<TEntity> specification = null,
            Expression<Func<TEntity, bool>> filter = null,
            string accessMode = AccessMode.Read,
            string queryMode = QueryMode.ReadList,
            string mapperMode = "Csv",
            bool isReadOnlyMode = false
            )
            where TOtherMapper : BaseMapper<TOtherDto, TEntity, TKey>, new()
            where TOtherDto : BaseDto<TKey>, new()
            where TOtherFilterDto : LazyLoadDto, new()
        {
            List<string> columnHeaders = null;
            if (filters is PagingFilterFormatDto fileFilters)
            {
                columnHeaders = fileFilters.Columns.Select(x => x.Value).ToList();
            }

            // We reset these parameters, used for paging, in order to recover the totality of the data.
            filters.First = 0;
            filters.Rows = 0;

            IEnumerable<TOtherDto> results = (await this.GetRangeAsync<TOtherDto, TOtherMapper, TOtherFilterDto>(filters: filters, id: id, specification: specification, filter: filter, accessMode: accessMode, queryMode: queryMode, isReadOnlyMode: isReadOnlyMode)).results;

            TOtherMapper mapper = InitMapper<TOtherDto, TOtherMapper>();
            List<object[]> records = results.Select(mapper.DtoToRecord(mapperMode)).ToList();

            StringBuilder csv = new();
            records.ForEach(line =>
            {
                csv.AppendLine(string.Join(BIAConstants.Csv.Separator, line));
            });

            string csvSep = $"sep={BIAConstants.Csv.Separator}\n";
            return Encoding.GetEncoding("iso-8859-1").GetBytes($"{csvSep}{string.Join(BIAConstants.Csv.Separator, columnHeaders ?? new List<string>())}\r\n{csv}");
        }

        /// <summary>
        /// Return a DTO for a given identifier.
        /// </summary>
        /// <typeparam name="TOtherDto">The type of DTO.</typeparam>
        /// <typeparam name="TOtherMapper">The type of Mapper entity to Dto.</typeparam>
        /// <param name="id">The identifier.</param>
        /// <param name="specification">Specification Used for Filtering Query.</param>
        /// <param name="filter">Filter Query.</param>
        /// <param name="includes">The list of includes.</param>
        /// <param name="accessMode">The acces Mode (Read, Write delete, all ...). It take the corresponding filter.</param>
        /// <param name="queryMode">The queryMode use to customize query (repository functions CustomizeQueryBefore and CustomizeQueryAfter)</param>
        /// <param name="mapperMode">A string to adapt the mapper function DtoToEntity.</param>
        /// <returns>The DTO.</returns>
        public virtual async Task<TOtherDto> GetAsync<TOtherDto, TOtherMapper>(
            TKey id = default,
            Specification<TEntity> specification = null,
            Expression<Func<TEntity, bool>> filter = null,
            Expression<Func<TEntity, object>>[] includes = null,
            string accessMode = AccessMode.Read,
            string queryMode = QueryMode.Read,
            string mapperMode = MapperMode.Item,
            bool isReadOnlyMode = false)

            where TOtherMapper : BaseMapper<TOtherDto, TEntity, TKey>, new()
            where TOtherDto : BaseDto<TKey>, new()
        {
            TOtherMapper mapper = InitMapper<TOtherDto, TOtherMapper>();
            var result = await this.Repository.GetResultAsync(mapper.EntityToDto(mapperMode),
                id: id,
                specification: GetFilterSpecification(accessMode, filtersContext) & specification,
                filter: filter,
                includes: includes,
                queryMode: queryMode, isReadOnlyMode: isReadOnlyMode);
            if (result == null)
            {
                throw new ElementNotFoundException();
            }

            return result;
        }

        /// <summary>
        /// Transform the DTO into the corresponding entity and add it to the DB.
        /// </summary>
        /// <typeparam name="TOtherDto">The type of DTO.</typeparam>
        /// <typeparam name="TOtherMapper">The type of Mapper entity to Dto.</typeparam>
        /// <param name="dto">The DTO.</param>
        /// <param name="mapperMode">A string to adapt the mapper function DtoToEntity.</param>
        /// <returns>The DTO with id updated.</returns>
        public virtual async Task<TOtherDto> AddAsync<TOtherDto, TOtherMapper>(TOtherDto dto,
            string mapperMode = null)
            where TOtherMapper : BaseMapper<TOtherDto, TEntity, TKey>, new()
            where TOtherDto : BaseDto<TKey>, new()
        {
            if (dto != null)
            {
                TOtherMapper mapper = InitMapper<TOtherDto, TOtherMapper>();
                var entity = new TEntity();
                mapper.DtoToEntity(dto, entity, mapperMode, this.Repository.UnitOfWork);
                this.Repository.Add(entity);
                await this.Repository.UnitOfWork.CommitAsync();
                mapper.MapEntityKeysInDto(entity, dto);
            }

            return dto;
        }

        /// <summary>
        /// Update an entity in DB with the DTO values.
        /// </summary>
        /// <typeparam name="TOtherDto">The type of DTO.</typeparam>
        /// <typeparam name="TOtherMapper">The type of Mapper entity to Dto.</typeparam>
        /// <param name="dto">The DTO.</param>
        /// <param name="accessMode">The acces Mode (Read, Write delete, all ...). It take the corresponding filter.</param>
        /// <param name="queryMode">The queryMode use to customize query (repository functions CustomizeQueryBefore and CustomizeQueryAfter)</param>
        /// <param name="mapperMode">A string to adapt the mapper function DtoToEntity.</param>
        /// <returns>The DTO updated.</returns>
        public virtual async Task<TOtherDto> UpdateAsync<TOtherDto, TOtherMapper>(
            TOtherDto dto,
            string accessMode = AccessMode.Update,
            string queryMode = QueryMode.Update,
            string mapperMode = null)
            where TOtherMapper : BaseMapper<TOtherDto, TEntity, TKey>, new()
            where TOtherDto : BaseDto<TKey>, new()
        {
            if (dto != null)
            {
                TOtherMapper mapper = InitMapper<TOtherDto, TOtherMapper>();

                var entity = await this.Repository.GetEntityAsync(id: dto.Id, specification: GetFilterSpecification(accessMode, filtersContext), includes: mapper.IncludesForUpdate(mapperMode), queryMode: queryMode);
                if (entity == null)
                {
                    throw new ElementNotFoundException();
                }

                mapper.DtoToEntity(dto, entity, mapperMode, this.Repository.UnitOfWork);
                // this.Repository.Update(entity);
                await this.Repository.UnitOfWork.CommitAsync();
                dto.DtoState = DtoState.Unchanged;
                mapper.MapEntityKeysInDto(entity, dto);
            }

            return dto;
        }

        /// <summary>
        /// Remove an entity with its identifier.
        /// </summary>
        /// <typeparam name="TOtherDto">The type of DTO.</typeparam>
        /// <typeparam name="TOtherMapper">The type of Mapper entity to Dto.</typeparam>
        /// <param name="id">The identifier.</param>
        /// <param name="accessMode">The acces Mode (Read, Write delete, all ...). It take the corresponding filter.</param>
        /// <param name="queryMode">The queryMode use to customize query (repository functions CustomizeQueryBefore and CustomizeQueryAfter)</param>
        /// <param name="mapperMode">A string to adapt the mapper function DtoToEntity.</param>
        /// <returns>The deleted DTO</returns>
        public virtual async Task<TOtherDto> RemoveAsync<TOtherDto, TOtherMapper>(
            TKey id,
            string accessMode = AccessMode.Delete,
            string queryMode = QueryMode.Delete,
            string mapperMode = null)
            where TOtherMapper : BaseMapper<TOtherDto, TEntity, TKey>, new()
            where TOtherDto : BaseDto<TKey>, new()
        {
            TOtherMapper mapper = InitMapper<TOtherDto, TOtherMapper>();

            var entity = await this.Repository.GetEntityAsync(id: id, specification: GetFilterSpecification(accessMode, filtersContext), includes: mapper.IncludesBeforeDelete(mapperMode), queryMode: queryMode);
            if (entity == null)
            {
                throw new ElementNotFoundException();
            }

            var dto = new TOtherDto();
            mapper.MapEntityKeysInDto(entity, dto);

            this.Repository.Remove(entity);
            await this.Repository.UnitOfWork.CommitAsync();
            return dto;
        }

        public virtual async Task<List<TOtherDto>> RemoveAsync<TOtherDto, TOtherMapper>(
            List<TKey> ids,
            string accessMode = AccessMode.Delete,
            string queryMode = QueryMode.Delete,
            string mapperMode = null)
            where TOtherMapper : BaseMapper<TOtherDto, TEntity, TKey>, new()
            where TOtherDto : BaseDto<TKey>, new()
        {
            var dtos = new List<TOtherDto>();
            foreach (TKey id in ids)
            {
                dtos.Add(await this.RemoveAsync<TOtherDto, TOtherMapper>(id, accessMode: accessMode, queryMode: queryMode, mapperMode: mapperMode));
            }
            return dtos;
        }

        public virtual async Task<IEnumerable<TOtherDto>> SaveAsync<TOtherDto, TOtherMapper>(IEnumerable<TOtherDto> dtos,
            string accessMode = null,
            string queryMode = null,
            string mapperMode = null)
            where TOtherMapper : BaseMapper<TOtherDto, TEntity, TKey>, new()
            where TOtherDto : BaseDto<TKey>, new()
        {
            var dtoList = dtos.ToList();
            List<TOtherDto> returnDto = new List<TOtherDto>();
            if (dtoList.Any())
            {
                using (var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
                {
                    foreach (var dto in dtoList)
                    {
                        returnDto.Add(await this.SaveAsync<TOtherDto, TOtherMapper>(dto, accessMode: accessMode, queryMode: queryMode, mapperMode: mapperMode));
                    }

                    transaction.Complete();
                }
            }
            return returnDto;
        }

        /// <summary>
        /// Save a DTO in DB regarding to its state.
        /// </summary>
        /// <param name="dto">The dto to save.</param>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        public virtual async Task<TOtherDto> SaveAsync<TOtherDto, TOtherMapper>(TOtherDto dto,
            string accessMode = null,
            string queryMode = null,
            string mapperMode = null)
            where TOtherMapper : BaseMapper<TOtherDto, TEntity, TKey>, new()
            where TOtherDto : BaseDto<TKey>, new()
        {
            TOtherDto returnDto = dto;
            switch (dto.DtoState)
            {
                case DtoState.Added:
                    returnDto = await this.AddAsync<TOtherDto, TOtherMapper>(dto,
                        mapperMode: mapperMode);
                    break;

                case DtoState.Modified:
                    returnDto = await this.UpdateAsync<TOtherDto, TOtherMapper>(dto,
                        accessMode: accessMode ?? AccessMode.Update,
                        queryMode: queryMode ?? QueryMode.Update,
                        mapperMode: mapperMode);
                    break;

                case DtoState.Deleted:
                    returnDto = await this.RemoveAsync<TOtherDto, TOtherMapper>(dto.Id,
                        accessMode: accessMode ?? AccessMode.Delete,
                        queryMode: queryMode ?? QueryMode.Delete,
                        mapperMode: mapperMode);
                    break;

                default:
                    return returnDto;
            }
            return returnDto;
        }

        /// <summary>
        /// Get the paging order.
        /// </summary>
        /// <param name="collection">The expression collection of entity.</param>
        /// <param name="orderMember">The order member.</param>
        /// <param name="ascending">If set to <c>true</c> [ascending].</param>
        /// <returns>The paging order.</returns>
        protected virtual QueryOrder<TEntity> GetQueryOrder(ExpressionCollection<TEntity> collection, string orderMember, bool ascending)
        {
            if (string.IsNullOrWhiteSpace(orderMember) || !collection.ContainsKey(orderMember))
            {
                return new QueryOrder<TEntity>().OrderBy(entity => entity.Id);
            }

            var order = new QueryOrder<TEntity>();
            order.GetByExpression(collection[orderMember], ascending);
            return order;
        }

        /// <summary>
        /// Returns the filter to apply to the context for specify acces mode
        /// </summary>
        /// <param name="mode">Precise the usage (All/Read/Write)</param>
        /// <returns>The result mapped to the specified type</returns>
        protected virtual Specification<TEntity> GetFilterSpecification(string mode, Dictionary<string, Specification<TEntity>> filtersContext)
        {
            if (filtersContext.ContainsKey(mode))
            {
                return filtersContext[mode];
            }
            else if (mode == AccessMode.Update)
            {
                if (filtersContext.ContainsKey(AccessMode.Read))
                {
                    return filtersContext[AccessMode.Read];
                }
            }
            else if (mode == AccessMode.Delete)
            {
                if (filtersContext.ContainsKey(AccessMode.Update))
                {
                    return filtersContext[AccessMode.Update];
                }
                if (filtersContext.ContainsKey(AccessMode.Read))
                {
                    return filtersContext[AccessMode.Read];
                }
            }
            return null;
        }

        public virtual async Task AddBulkAsync<TOtherDto, TOtherMapper>(IEnumerable<TOtherDto> dtoList)
            where TOtherMapper : BaseMapper<TOtherDto, TEntity, TKey>, new()
            where TOtherDto : BaseDto<TKey>, new()
        {
            if (dtoList != null)
            {
                var entity = new List<TEntity>();

                foreach (var item in dtoList)
                {
                    var converted = new TEntity();
                    TOtherMapper mapper = InitMapper<TOtherDto, TOtherMapper>();
                    mapper.DtoToEntity(item, converted);
                    entity.Add(converted);
                }

                await this.Repository.UnitOfWork.AddBulkAsync(entity);
            }
        }

        public virtual async Task UpdateBulkAsync<TOtherDto, TOtherMapper>(IEnumerable<TOtherDto> dtoList)
            where TOtherMapper : BaseMapper<TOtherDto, TEntity, TKey>, new()
            where TOtherDto : BaseDto<TKey>, new()
        {
            if (dtoList != null)
            {
                var entity = new List<TEntity>();

                foreach (var item in dtoList)
                {
                    var converted = new TEntity();
                    TOtherMapper mapper = InitMapper<TOtherDto, TOtherMapper>();
                    mapper.DtoToEntity(item, converted);
                    entity.Add(converted);
                }

                await this.Repository.UnitOfWork.UpdateBulkAsync(entity);
            }
        }

        public virtual async Task RemoveBulkAsync<TOtherDto, TOtherMapper>(IEnumerable<TOtherDto> dtoList)
            where TOtherMapper : BaseMapper<TOtherDto, TEntity, TKey>, new()
            where TOtherDto : BaseDto<TKey>, new()
        {
            if (dtoList != null)
            {
                var entity = new List<TEntity>();

                foreach (var item in dtoList)
                {
                    var converted = new TEntity();
                    TOtherMapper mapper = InitMapper<TOtherDto, TOtherMapper>();
                    mapper.DtoToEntity(item, converted);
                    entity.Add(converted);
                }

                await this.Repository.UnitOfWork.RemoveBulkAsync(entity);
            }
        }

        public virtual async Task RemoveBulkAsync(IEnumerable<TKey> idList, string accessMode = AccessMode.Delete, string queryMode = QueryMode.Delete)
        {
            var entity = await this.Repository.GetAllEntityAsync(specification: GetFilterSpecification(accessMode, filtersContext), filter: x => idList.Contains(x.Id), queryMode: queryMode);
            if (entity == null)
            {
                throw new ElementNotFoundException();
            }

            await this.Repository.UnitOfWork.RemoveBulkAsync(entity);
        }
    }
}