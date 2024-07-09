using awqaf.Domain;
using awqaf.Dto;
using JHipsterNet.Core.Pagination;
using MediatR;
using System.Collections.Generic;


namespace awqaf.Application.Queries
{
    public class ProvidersGetAllByByCategoryIdHoldingCompanyQuery : IRequest<IEnumerable<HoldingCompanyInfo>>
    {
      
         public long CategoryId { get; set; }
    }
}
