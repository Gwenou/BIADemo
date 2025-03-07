// BIADemo only
// <copyright file="AirportMapper.cs" company="TheBIADevCompany">
//     Copyright (c) TheBIADevCompany. All rights reserved.
// </copyright>

namespace TheBIADevCompany.BIADemo.Domain.PlaneModule.Aggregate
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Linq.Expressions;
    using BIA.Net.Core.Domain;
    using TheBIADevCompany.BIADemo.Domain.Dto.Plane;

    /// <summary>
    /// The mapper used for plane.
    /// </summary>
    public class AirportMapper : BaseMapper<AirportDto, Airport, int>
    {
        /// <inheritdoc cref="BaseMapper{TDto,TEntity}.ExpressionCollection"/>
        public override ExpressionCollection<Airport> ExpressionCollection
        {
            get
            {
                return new ExpressionCollection<Airport>
                {
                    { HeaderName.Id, planeType => planeType.Id },
                    { HeaderName.Name, planeType => planeType.Name },
                    { HeaderName.City, planeType => planeType.City },
                };
            }
        }

        /// <inheritdoc cref="BaseMapper{TDto,TEntity}.DtoToEntity"/>
        public override void DtoToEntity(AirportDto dto, Airport entity)
        {
            if (entity == null)
            {
                entity = new Airport();
            }

            entity.Id = dto.Id;
            entity.Name = dto.Name;
            entity.City = dto.City;
        }

        /// <inheritdoc cref="BaseMapper{TDto,TEntity}.EntityToDto"/>
        public override Expression<Func<Airport, AirportDto>> EntityToDto()
        {
            return entity => new AirportDto
            {
                Id = entity.Id,
                Name = entity.Name,
                City = entity.City,
            };
        }

        /// <inheritdoc cref="BaseMapper{TDto,TEntity}.DtoToRecord"/>
        public override Func<AirportDto, object[]> DtoToRecord(List<string> headerNames = null)
        {
            return x =>
            {
                List<object> records = new List<object>();

                if (headerNames != null && headerNames?.Any() == true)
                {
                    foreach (string headerName in headerNames)
                    {
                        if (string.Equals(headerName, HeaderName.Name, StringComparison.OrdinalIgnoreCase))
                        {
                            records.Add(CSVString(x.Name));
                        }

                        if (string.Equals(headerName, HeaderName.City, StringComparison.OrdinalIgnoreCase))
                        {
                            records.Add(CSVString(x.City));
                        }
                    }
                }

                return records.ToArray();
            };
        }

        /// <summary>
        /// Header Name.
        /// </summary>
        public struct HeaderName
        {
            /// <summary>
            /// header name Id.
            /// </summary>
            public const string Id = "id";

            /// <summary>
            /// header name Name.
            /// </summary>
            public const string Name = "name";

            /// <summary>
            /// header name City.
            /// </summary>
            public const string City = "city";
        }
    }
}