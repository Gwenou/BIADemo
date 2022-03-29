// <copyright file="NotificationMapper.cs" company="TheBIADevCompany">
//     Copyright (c) TheBIADevCompany. All rights reserved.
// </copyright>

namespace TheBIADevCompany.BIADemo.Domain.NotificationModule.Aggregate
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Linq.Expressions;
    using BIA.Net.Core.Domain;
    using BIA.Net.Core.Domain.Dto.Base;
    using BIA.Net.Core.Domain.Dto.Notification;
    using BIA.Net.Core.Domain.Dto.Option;
    using BIA.Net.Core.Domain.Service;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Serialization;
    using TheBIADevCompany.BIADemo.Domain.TranslationModule.Aggregate;

    /// <summary>
    /// The mapper used for user.
    /// </summary>
    public class NotificationMapper : BaseMapper<NotificationDto, Notification, int>
    {
        /// <inheritdoc cref="BaseMapper{TDto,TEntity}.ExpressionCollection"/>
        public override ExpressionCollection<Notification> ExpressionCollection
        {
            get
            {
                return new ExpressionCollection<Notification>
                {
                    { "Title", notification => notification.Title },
                    { "Description", notification => notification.Description },
                    { "TitleTranslated", notification => notification.NotificationTranslations.Where(rt => rt.Language.Code == this.UserContext.Language).Select(rt => rt.Title).FirstOrDefault() ?? notification.Title },
                    { "DescriptionTranslated", notification => notification.NotificationTranslations.Where(rt => rt.Language.Code == this.UserContext.Language).Select(rt => rt.Description).FirstOrDefault() ?? notification.Description },
                    { "CreatedDate", notification => notification.CreatedDate },
                    { "Type", notification => notification.Type.NotificationTypeTranslations.Where(rt => rt.Language.Code == this.UserContext.Language).Select(rt => rt.Label).FirstOrDefault() ?? notification.Type.Label },
                    { "Read", notification => notification.Read },
                    { "CreatedBy", notification => notification.CreatedBy.FirstName + notification.CreatedBy.LastName + " (" + notification.CreatedBy.Login + ")" },
                    {
                        "NotifiedRoles", notification => notification.NotifiedRoles.Select(x =>
                        x.Role.RoleTranslations.Where(rt => rt.Language.Code == this.UserContext.Language).Select(rt => rt.Label).FirstOrDefault() ?? x.Role.Label).OrderBy(x => x)
                    },
                    { "NotifiedTeams", notification => notification.NotifiedTeams.Select(x => x.Team.Title) },
                    { "NotifiedUsers", notification => notification.NotifiedUsers.Select(x => x.User.FirstName + " " + x.User.LastName + " (" + x.User.Login + ")").OrderBy(x => x) },
                };
            }
        }

        /// <inheritdoc cref="BaseMapper{TDto,TEntity}.DtoToEntity"/>
        public override void DtoToEntity(NotificationDto dto, Notification entity)
        {
            if (entity == null)
            {
                entity = new Notification();
            }

            entity.Id = dto.Id;
            entity.Read = dto.Read;
            entity.Title = dto.Title;
            entity.CreatedDate = dto.CreatedDate;
            entity.Description = dto.Description;
            entity.CreatedById = dto.CreatedBy?.Id;
            entity.TypeId = dto.Type.Id;
            entity.JData = dto.JData;

            // Mapping relationship *-* : ICollection<OptionDto> NotifiedRoles
            if (dto.NotifiedRoles?.Any() == true)
            {
                foreach (var roleDto in dto.NotifiedRoles.Where(x => x.DtoState == DtoState.Deleted))
                {
                    var role = entity.NotifiedRoles.FirstOrDefault(x => x.RoleId == roleDto.Id && x.NotificationId == dto.Id);
                    if (role != null)
                    {
                        entity.NotifiedRoles.Remove(role);
                    }
                }

                entity.NotifiedRoles = entity.NotifiedRoles ?? new List<NotificationRole>();
                foreach (var roleDto in dto.NotifiedRoles.Where(w => w.DtoState == DtoState.Added))
                {
                    entity.NotifiedRoles.Add(new NotificationRole
                    { RoleId = roleDto.Id, NotificationId = dto.Id });
                }
            }

            // Mapping relationship *-* : ICollection<OptionDto> NotifiedUsers
            if (dto.NotifiedUsers?.Any() == true)
            {
                foreach (var userDto in dto.NotifiedUsers.Where(x => x.DtoState == DtoState.Deleted))
                {
                    var connectingAirport = entity.NotifiedUsers.FirstOrDefault(x => x.UserId == userDto.Id && x.NotificationId == dto.Id);
                    if (connectingAirport != null)
                    {
                        entity.NotifiedUsers.Remove(connectingAirport);
                    }
                }

                entity.NotifiedUsers = entity.NotifiedUsers ?? new List<NotificationUser>();
                foreach (var userDto in dto.NotifiedUsers.Where(w => w.DtoState == DtoState.Added))
                {
                    entity.NotifiedUsers.Add(new NotificationUser
                    { UserId = userDto.Id, NotificationId = dto.Id });
                }
            }

            // Mapping relationship *-* : ICollection<OptionDto> NotifiedTeams
            if (dto.NotifiedTeams?.Any() == true)
            {
                foreach (var teamDto in dto.NotifiedTeams.Where(x => x.DtoState == DtoState.Deleted))
                {
                    var notifiedTeams = entity.NotifiedTeams.FirstOrDefault(x => x.TeamId == teamDto.Id && x.NotificationId == dto.Id);
                    if (notifiedTeams != null)
                    {
                        entity.NotifiedTeams.Remove(notifiedTeams);
                    }
                }

                entity.NotifiedTeams = entity.NotifiedTeams ?? new List<NotificationTeam>();
                foreach (var teamDto in dto.NotifiedTeams.Where(w => w.DtoState == DtoState.Added))
                {
                    entity.NotifiedTeams.Add(new NotificationTeam { TeamId = teamDto.Id, NotificationId = dto.Id });
                }
            }

            // Mapping relationship *-1 : ICollection<NotificationTranslationDto> NotificationTranslation
            if (dto.NotificationTranslations?.Any() == true)
            {
                foreach (var notificationTranslationDto in dto.NotificationTranslations.Where(x => x.DtoState == DtoState.Deleted))
                {
                    var notificationTranslation = entity.NotificationTranslations.FirstOrDefault(x => x.LanguageId == notificationTranslationDto.LanguageId && x.NotificationId == dto.Id);
                    if (notificationTranslation != null)
                    {
                        entity.NotificationTranslations.Remove(notificationTranslation);
                    }
                }

                foreach (var notificationTranslationDto in dto.NotificationTranslations.Where(x => x.DtoState == DtoState.Modified))
                {
                    var notificationTranslation = entity.NotificationTranslations.FirstOrDefault(x => x.LanguageId == notificationTranslationDto.LanguageId && x.NotificationId == dto.Id);
                    if (notificationTranslation != null)
                    {
                        notificationTranslation.Title = notificationTranslationDto.Title;
                        notificationTranslation.Description = notificationTranslationDto.Description;
                    }
                }

                entity.NotificationTranslations = entity.NotificationTranslations ?? new List<NotificationTranslation>();
                foreach (var notificationTranslationDto in dto.NotificationTranslations.Where(w => w.DtoState == DtoState.Added))
                {
                    entity.NotificationTranslations.Add(new NotificationTranslation
                    { LanguageId = notificationTranslationDto.LanguageId, NotificationId = dto.Id, Title = notificationTranslationDto.Title, Description = notificationTranslationDto.Description });
                }
            }
        }

        /// <inheritdoc cref="BaseMapper{TDto,TEntity}.EntityToDto"/>
        public override Expression<Func<Notification, NotificationDto>> EntityToDto(string mapperMode)
        {
            if (mapperMode == MapperMode.Item)
            {
                return entity => new NotificationDto
                {
                    Id = entity.Id,
                    Title = entity.Title,
                    Description = entity.Description,
                    TitleTranslated = entity.NotificationTranslations.Where(rt => rt.Language.Code == this.UserContext.Language).Select(rt => rt.Title).FirstOrDefault() ?? entity.Title,
                    DescriptionTranslated = entity.NotificationTranslations.Where(rt => rt.Language.Code == this.UserContext.Language).Select(rt => rt.Description).FirstOrDefault() ?? entity.Description,

                    CreatedDate = entity.CreatedDate,

                    CreatedBy = entity.CreatedBy != null ? new OptionDto
                    {
                        Id = entity.CreatedBy.Id,
                        Display = entity.CreatedBy.FirstName + " " + entity.CreatedBy.LastName + " (" + entity.CreatedBy.Login + ")",
                    }
                    : null,

                    Read = entity.Read,
                    Type = new OptionDto
                    {
                        Id = entity.TypeId,
                        Display = entity.Type.NotificationTypeTranslations.Where(rt => rt.Language.Code == this.UserContext.Language).Select(rt => rt.Label).FirstOrDefault() ?? entity.Type.Label,
                    },

                    JData = entity.JData,

                    NotifiedRoles = entity.NotifiedRoles.Select(nu => new OptionDto
                    {
                        Id = nu.Role.Id,
                        Display = nu.Role.RoleTranslations.Where(rt => rt.Language.Code == this.UserContext.Language).Select(rt => rt.Label).FirstOrDefault() ?? entity.Type.Label,
                    }).ToList(),

                    NotifiedTeams = entity.NotifiedTeams.Select(nt => new NotificationTeamDto
                    {
                        Id = nt.TeamId,
                        TypeId = nt.Team.TeamTypeId,
                        Display = nt.Team.Title,
                    }).ToList(),

                    NotifiedUsers = entity.NotifiedUsers.Select(nu => new OptionDto
                    {
                        Id = nu.User.Id,
                        Display = nu.User.FirstName + " " + nu.User.LastName + " (" + nu.User.Login + ")",
                    }).ToList(),

                    NotificationTranslations = entity.NotificationTranslations.Select(nt => new NotificationTranslationDto
                    {
                        DtoState = DtoState.Unchanged,
                        Id = nt.Id,
                        LanguageId = nt.LanguageId,
                        Title = nt.Title,
                        Description = nt.Description,
                    }).ToList(),
                };
            }
            else
            {
                return entity => new NotificationDto
                {
                    Id = entity.Id,
                    Title = entity.Title,
                    Description = entity.Description,
                    TitleTranslated = entity.NotificationTranslations.Where(rt => rt.Language.Code == this.UserContext.Language).Select(rt => rt.Title).FirstOrDefault() ?? entity.Title,
                    DescriptionTranslated = entity.NotificationTranslations.Where(rt => rt.Language.Code == this.UserContext.Language).Select(rt => rt.Description).FirstOrDefault() ?? entity.Description,

                    CreatedDate = entity.CreatedDate,

                    CreatedBy = entity.CreatedBy != null ? new OptionDto
                    {
                        Id = entity.CreatedBy.Id,
                        Display = entity.CreatedBy.FirstName + " " + entity.CreatedBy.LastName + " (" + entity.CreatedBy.Login + ")",
                    }
                    : null,

                    Read = entity.Read,
                    Type = new OptionDto
                    {
                        Id = entity.TypeId,
                        Display = entity.Type.NotificationTypeTranslations.Where(rt => rt.Language.Code == this.UserContext.Language).Select(rt => rt.Label).FirstOrDefault() ?? entity.Type.Label,
                    },

                    JData = entity.JData,

                    NotifiedRoles = entity.NotifiedRoles.Select(nu => new OptionDto
                    {
                        Id = nu.Role.Id,
                        Display = nu.Role.RoleTranslations.Where(rt => rt.Language.Code == this.UserContext.Language).Select(rt => rt.Label).FirstOrDefault() ?? entity.Type.Label,
                    }).ToList(),

                    NotifiedTeams = entity.NotifiedTeams.Select(nt => new NotificationTeamDto
                    {
                        Id = nt.TeamId,
                        TypeId = nt.Team.TeamTypeId,
                        Display = nt.Team.Title,
                    }).ToList(),

                    NotifiedUsers = entity.NotifiedUsers.Select(nu => new OptionDto
                    {
                        Id = nu.User.Id,
                        Display = nu.User.FirstName + " " + nu.User.LastName + " (" + nu.User.Login + ")",
                    }).ToList(),
                };
            }
        }

        /// <inheritdoc/>
        public override void MapEntityKeysInDto(Notification entity, NotificationDto dto)
        {
            dto.Id = entity.Id;

            dto.NotifiedRoles = entity.NotifiedRoles?.Select(nr => new OptionDto
            {
                Id = nr.RoleId,
            }).ToList();

            dto.NotifiedTeams = entity.NotifiedTeams?.Select(nt => new NotificationTeamDto
            {
                Id = nt.TeamId,
            }).ToList();

            dto.NotifiedUsers = entity.NotifiedUsers?.Select(nu => new OptionDto
            {
                Id = nu.UserId,
            }).ToList();
        }

        /// <inheritdoc/>
        public override Expression<Func<Notification, object>>[] IncludesBeforeDelete()
        {
            return new Expression<Func<Notification, object>>[] { x => x.NotifiedTeams, x => x.NotifiedUsers, x => x.NotifiedRoles };
        }

        /// <inheritdoc cref="BaseMapper{TDto,TEntity}.DtoToRecord"/>
        public override Func<NotificationDto, object[]> DtoToRecord()
        {
            return x => (new object[]
            {
                CSVString(x.Title),
                CSVString(x.Description),
                CSVString(x.Type?.Display),
                x.Read ? "X" : string.Empty,
                x.CreatedDate.ToString("yyyy-MM-dd"),
                CSVString(x.CreatedBy?.Display),
                CSVString(string.Join(" - ", x.NotifiedRoles?.Select(ca => ca.Display).ToList())),
                CSVString(string.Join(" - ", x.NotifiedTeams?.Select(ca => ca.Display).ToList())),
                CSVString(string.Join(" - ", x.NotifiedUsers?.Select(ca => ca.Display).ToList())),
                CSVString(x.JData),
            });
        }
    }
}