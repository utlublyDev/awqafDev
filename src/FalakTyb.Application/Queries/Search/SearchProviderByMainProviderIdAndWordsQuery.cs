using awqaf.Domain;
using awqaf.Dto;
using JHipsterNet.Core.Pagination;
using MediatR;
using System.Collections.Generic;

namespace awqaf.Application.Queries
{
    public class SearchProviderByMainProviderIdAndWordsQuery : IRequest<IEnumerable<Providers>>
    {
        public IPageable Page { get; set; }
         public string Words { get; set; }

         public long MainId { get; set; }
    }
}
