using awqaf.Domain;
using awqaf.Dto;
using JHipsterNet.Core.Pagination;
using MediatR;
using System;
using System.Collections.Generic;
namespace awqaf.Application.Queries
{
    public class SavedProvidersGetAllByUserIdOffersQuery : IRequest<List<Offers>>
    {
        public IPageable Page { get; set; }

        public string UserId { get; set; }
    }
}
