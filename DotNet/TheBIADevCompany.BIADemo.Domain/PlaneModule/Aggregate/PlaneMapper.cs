// BIADemo only
// <copyright file="PlaneMapper.cs" company="TheBIADevCompany">
//     Copyright (c) TheBIADevCompany. All rights reserved.
// </copyright>

namespace TheBIADevCompany.BIADemo.Domain.PlaneModule.Aggregate
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Linq.Expressions;
    using BIA.Net.Core.Domain;
    using BIA.Net.Core.Domain.Dto.Base;
    using BIA.Net.Core.Domain.Dto.Option;
    using TheBIADevCompany.BIADemo.Domain.Dto.Plane;
    using TheBIADevCompany.BIADemo.Domain.Dto.Site;

    /// <summary>
    /// The mapper used for plane.
    /// </summary>
    public class PlaneMapper : BaseMapper<PlaneDto, Plane, int>
    {
        /// <summary>
        /// Header Name.
        /// </summary>
        public enum HeaderName
        {
            /// <summary>
            /// header name Id.
            /// </summary>
            Id,

            /// <summary>
            /// header name Msn.
            /// </summary>
            Msn,

            /// <summary>
            /// header name IsActive.
            /// </summary>
            IsActive,

            /// <summary>
            /// header name LastFlightDate.
            /// </summary>
            LastFlightDate,

            /// <summary>
            /// header name DeliveryDate.
            /// </summary>
            DeliveryDate,

            /// <summary>
            /// header name SyncTime.
            /// </summary>
            SyncTime,

            /// <summary>
            /// header name Capacity.
            /// </summary>
            Capacity,

            /// <summary>
            /// header name PlaneType.
            /// </summary>
            PlaneType,

            /// <summary>
            /// header name ConnectingAirports.
            /// </summary>
            ConnectingAirports,
        }

        /// <inheritdoc cref="BaseMapper{TDto,TEntity}.ExpressionCollection"/>
        public override ExpressionCollection<Plane> ExpressionCollection
        {
            // It is not necessary to implement this function if you to not use the mapper for filtered list. In BIADemo it is use only for Calc SpreadSheet.
            get
            {
                return new ExpressionCollection<Plane>
                {
                    { HeaderName.Id.ToString(), plane => plane.Id },
                    { HeaderName.Msn.ToString(), plane => plane.Msn },
                    { HeaderName.IsActive.ToString(), plane => plane.IsActive },
                    { HeaderName.LastFlightDate.ToString(), plane => plane.LastFlightDate },
                    { HeaderName.DeliveryDate.ToString(), plane => plane.DeliveryDate },
                    { HeaderName.SyncTime.ToString(), plane => plane.SyncTime },
                    { HeaderName.Capacity.ToString(), plane => plane.Capacity },
                    { HeaderName.PlaneType.ToString(), plane => plane.PlaneType != null ? plane.PlaneType.Title : null },
                    { HeaderName.ConnectingAirports.ToString(), plane => plane.ConnectingAirports.Select(x => x.Airport.Name).OrderBy(x => x) },
                };
            }
        }

        /// <inheritdoc cref="BaseMapper{TDto,TEntity}.DtoToEntity"/>
        public override void DtoToEntity(PlaneDto dto, Plane entity)
        {
            if (entity == null)
            {
                entity = new Plane();
            }

            entity.Id = dto.Id;
            entity.Msn = dto.Msn;
            entity.IsActive = dto.IsActive;
            entity.LastFlightDate = dto.LastFlightDate;
            entity.DeliveryDate = dto.DeliveryDate;
            entity.SyncTime = string.IsNullOrEmpty(dto.SyncTime) ? null : TimeSpan.Parse(dto.SyncTime);
            entity.Capacity = dto.Capacity;

            // Mapping relationship 1-* : Site
            if (dto.SiteId != 0)
            {
                entity.SiteId = dto.SiteId;
            }

            // Mapping relationship 0..1-* : PlaneType
            entity.PlaneTypeId = dto.PlaneType?.Id;

            // Mapping relationship *-* : ICollection<OptionDto> ConnectingAirports
            if (dto.ConnectingAirports?.Any() == true)
            {
                foreach (var airportDto in dto.ConnectingAirports.Where(x => x.DtoState == DtoState.Deleted))
                {
                    var connectingAirport = entity.ConnectingAirports.FirstOrDefault(x => x.AirportId == airportDto.Id && x.PlaneId == dto.Id);
                    if (connectingAirport != null)
                    {
                        entity.ConnectingAirports.Remove(connectingAirport);
                    }
                }

                entity.ConnectingAirports = entity.ConnectingAirports ?? new List<PlaneAirport>();
                foreach (var airportDto in dto.ConnectingAirports.Where(w => w.DtoState == DtoState.Added))
                {
                    entity.ConnectingAirports.Add(new PlaneAirport
                    { AirportId = airportDto.Id, PlaneId = dto.Id });
                }
            }
        }

        /// <inheritdoc cref="BaseMapper{TDto,TEntity}.EntityToDto"/>
        public override Expression<Func<Plane, PlaneDto>> EntityToDto()
        {
            return entity => new PlaneDto
            {
                Id = entity.Id,
                Msn = entity.Msn,
                IsActive = entity.IsActive,
                LastFlightDate = entity.LastFlightDate,
                DeliveryDate = entity.DeliveryDate,
                SyncTime = entity.SyncTime.Value.ToString(@"hh\:mm\:ss"),
                Capacity = entity.Capacity,

                // Mapping relationship 1-* : Site
                SiteId = entity.SiteId,

                // Mapping relationship 0..1-* : PlaneType
                PlaneType = entity.PlaneType != null ? new OptionDto
                {
                    Id = entity.PlaneType.Id,
                    Display = entity.PlaneType.Title,
                }
                : null,

                // Mapping relationship *-* : ICollection<Airports>
                ConnectingAirports = entity.ConnectingAirports.Select(ca => new OptionDto
                {
                    Id = ca.Airport.Id,
                    Display = ca.Airport.Name,
                }).ToList(),
            };
        }

        /// <inheritdoc cref="BaseMapper{TDto,TEntity}.DtoToRecord"/>
        public override Func<PlaneDto, object[]> DtoToRecord(List<string> headerNames = null)
        {
            return x =>
            {
                List<object> records = new List<object>();

                if (headerNames?.Any() == true)
                {
                    foreach (string headerName in headerNames)
                    {
                        if (string.Equals(headerName, HeaderName.Msn.ToString(), StringComparison.OrdinalIgnoreCase))
                        {
                            records.Add(CSVString(x.Msn));
                        }

                        if (string.Equals(headerName, HeaderName.IsActive.ToString(), StringComparison.OrdinalIgnoreCase))
                        {
                            records.Add(CSVBool(x.IsActive));
                        }

                        if (string.Equals(headerName, HeaderName.LastFlightDate.ToString(), StringComparison.OrdinalIgnoreCase))
                        {
                            records.Add(CSVDateTime(x.LastFlightDate));
                        }

                        if (string.Equals(headerName, HeaderName.DeliveryDate.ToString(), StringComparison.OrdinalIgnoreCase))
                        {
                            records.Add(CSVDate(x.DeliveryDate));
                        }

                        if (string.Equals(headerName, HeaderName.SyncTime.ToString(), StringComparison.OrdinalIgnoreCase))
                        {
                            records.Add(CSVTime(x.SyncTime));
                        }

                        if (string.Equals(headerName, HeaderName.Capacity.ToString(), StringComparison.OrdinalIgnoreCase))
                        {
                            records.Add(CSVNumber(x.Capacity));
                        }

                        if (string.Equals(headerName, HeaderName.PlaneType.ToString(), StringComparison.OrdinalIgnoreCase))
                        {
                            records.Add(CSVString(x.PlaneType?.Display));
                        }

                        if (string.Equals(headerName, HeaderName.ConnectingAirports.ToString(), StringComparison.OrdinalIgnoreCase))
                        {
                            records.Add(CSVList(x.ConnectingAirports));
                        }
                    }
                }

                return records.ToArray();
            };
        }

        /// <inheritdoc/>
        public override void MapEntityKeysInDto(Plane entity, PlaneDto dto)
        {
            dto.Id = entity.Id;
            dto.SiteId = entity.SiteId;
        }

        /// <inheritdoc cref="BaseMapper{TDto,TEntity}.IncludesForUpdate"/>
        public override Expression<Func<Plane, object>>[] IncludesForUpdate()
        {
            return new Expression<Func<Plane, object>>[] { x => x.ConnectingAirports };
        }
    }
}