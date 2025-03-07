﻿namespace BIA.Net.Core.Domain.Dto.User
{
    using System.Collections.Generic;

    public class TokenDto<TUserDataDto> where TUserDataDto: UserDataDto
    {
        /// <summary>
        /// Gets or sets the login.
        /// </summary>
        public string Login { get; set; }

        /// <summary>
        /// Gets or sets the user Id.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets the permissions.
        /// </summary>
        public IEnumerable<string> Permissions { get; set; }

        /// <summary>
        /// Gets or sets the user data.
        /// </summary>
        public TUserDataDto UserData { get; set; }
    }
}
