﻿namespace TheBIADevCompany.BIADemo.Domain.UserModule.Service
{
    using System;
    using System.Linq.Expressions;
    using BIA.Net.Core.Domain.Dto.User;
    using TheBIADevCompany.BIADemo.Domain.UserModule.Aggregate;

    /// <summary>
    /// This class MAnage the identity key during authentication and relation beetween Database, Directory and identity Provider.
    /// </summary>
    public class UserIdentityKeyDomainService : IUserIdentityKeyDomainService
    {
        // -------------------------------- DataBase EntityKey --------------------------------------

        /// <summary>
        /// Check the Identity Key from the User in database.
        /// If you change it parse all other #IdentityKey to be sure thare is a match (Database => Directory, Idp & WindowsIdentity).
        /// </summary>
        /// <param name="identityKey">the identityKey.</param>
        /// <returns>Expression to compare.</returns>
        public Expression<Func<User, bool>> CheckDatabaseIdentityKey(string identityKey)
        {
            return user => user.Login == identityKey;
        }

        /// <summary>
        /// Gets the Identity Key to compare with User in database.
        /// It is use to specify the unique identifier that is compare during the authentication process.
        /// If you change it parse all other #IdentityKey to be sure thare is a match (Database, Ldap, Idp, WindowsIdentity).
        /// </summary>
        /// <param name="user">the user.</param>
        /// <returns>Return the Identity Key.</returns>
        public string GetDatabaseIdentityKey(User user)
        {
            return user.Login;
        }

        // -------------------------------- Directory EntityKey --------------------------------------

        /// <summary>
        /// Check the Identity Key from the User in database.
        /// It is use to specify the unique identifier that is compare during the authentication process.
        /// If you change it parse all other #IdentityKey to be sure thare is a match (Database => Directory, Idp & WindowsIdentity).
        /// </summary>
        /// <param name="identityKey">the identityKey.</param>
        /// <returns>Expression to compare.</returns>
        public Expression<Func<UserFromDirectoryDto, bool>> CheckDirectoryIdentityKey(string identityKey)
        {
            return userFromDirectory => userFromDirectory.Login == identityKey;
        }

        /// <summary>
        /// Gets the Identity Key to compare with User in database.
        /// It is use to specify the unique identifier that is compare during the authentication process.
        /// If you change it parse all other #IdentityKey to be sure thare is a match (Database, Ldap, Idp, WindowsIdentity).
        /// </summary>
        /// <param name="userFromDirectory">the userFromDirectory.</param>
        /// <returns>Return the Identity Key.</returns>
        public string GetDirectoryIdentityKey(UserFromDirectory userFromDirectory)
        {
            return userFromDirectory.Login;
        }

        /// <summary>
        /// Gets the Identity Key to compare with User in database.
        /// It is use to specify the unique identifier that is compare during the authentication process.
        /// If you change it parse all other #IdentityKey to be sure thare is a match (Database, Ldap, Idp, WindowsIdentity).
        /// </summary>
        /// <param name="userFromDirectory">the userFromDirectory.</param>
        /// <returns>Return the Identity Key.</returns>
        public string GetDirectoryIdentityKey(UserFromDirectoryDto userFromDirectory)
        {
            return userFromDirectory.Login;
        }

        // -------------------------------- Identity Provider --------------------------------------
    }
}
