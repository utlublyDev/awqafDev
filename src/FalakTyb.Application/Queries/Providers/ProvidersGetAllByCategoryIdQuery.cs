using awqaf.Domain;
using awqaf.Dto;
using JHipsterNet.Core.Pagination;
using MediatR;

namespace awqaf.Application.Queries
{
    public class ProvidersGetAllByCategoryIdQuery : IRequest<IPage<Providers>>
    {
        public IPageable Page { get; set; }
         public long CategoryId { get; set; }
    }
}
