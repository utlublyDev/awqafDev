using awqaf.Domain;
using awqaf.Dto;
using JHipsterNet.Core.Pagination;
using MediatR;

using System.Collections.Generic;

namespace awqaf.Application.Queries
{
    public class OffersGetAllOffersByCategoryIdQuery : IRequest<IEnumerable<Offers>>
    {
  
        public long CategoryId { get; set; }
        public long ProviderId { get; set; } 
    }
}
