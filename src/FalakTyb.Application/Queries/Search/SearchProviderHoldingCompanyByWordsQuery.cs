using awqaf.Domain;
using JHipsterNet.Core.Pagination;
using MediatR;
using System.Collections.Generic;

namespace awqaf.Application.Queries
{
    public class SearchProviderHoldingCompanyByWordsQuery : IRequest<IEnumerable<HoldingCompanyInfo>>
    {
        public IPageable Page { get; set; }
         public string Words { get; set; }
    }
}
