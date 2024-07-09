using awqaf.Domain;
using awqaf.Dto;
using JHipsterNet.Core.Pagination;
using MediatR;
using System;
using System.Collections.Generic;
namespace awqaf.Application.Queries
{
    public class SavedProvidersGetAllByUserIdProviderQuery : IRequest<List<Providers>>
    {
        public IPageable Page { get; set; }

        public string UserId { get; set; }
    }
}
