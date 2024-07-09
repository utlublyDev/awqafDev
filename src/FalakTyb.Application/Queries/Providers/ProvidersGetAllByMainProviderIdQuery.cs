using awqaf.Domain;
using awqaf.Dto;
using JHipsterNet.Core.Pagination;
using MediatR;
using System.Collections.Generic;

namespace awqaf.Application.Queries
{
    public class ProvidersGetAllByMainProviderIdQuery : IRequest<IEnumerable<Providers>>
    {
        public IPageable Page { get; set; }
         public long MainProviderId { get; set; }
    }
}
