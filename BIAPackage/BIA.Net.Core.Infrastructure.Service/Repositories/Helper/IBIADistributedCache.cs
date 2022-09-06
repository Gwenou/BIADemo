﻿using System.Threading.Tasks;

namespace BIA.Net.Core.Infrastructure.Service.Repositories.Helper
{
    public interface IBIADistributedCache
    {
        Task Add(string key, object item, double cacheDurationInMinute);
        Task<T> Get<T>(string key);
        Task Remove(string key);
    }
}