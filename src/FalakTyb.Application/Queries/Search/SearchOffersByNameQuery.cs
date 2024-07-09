using awqaf.Domain;
using awqaf.Dto;
using JHipsterNet.Core.Pagination;
using MediatR;

using System.Collections.Generic;

namespace awqaf.Application.Queries
{
    public class SearchOffersByNameQuery : IRequest<IEnumerable<Offers>>
    {
  
        public string Words { get; set; }
    }
}
