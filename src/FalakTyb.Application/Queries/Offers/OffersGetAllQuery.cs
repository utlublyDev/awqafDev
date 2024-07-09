
using awqaf.Domain;
using awqaf.Dto;
using JHipsterNet.Core.Pagination;
using MediatR;

namespace awqaf.Application.Queries
{
    public class OffersGetAllQuery : IRequest<IPage<Offers>>
    {
        public IPageable Page { get; set; }
    }
}
