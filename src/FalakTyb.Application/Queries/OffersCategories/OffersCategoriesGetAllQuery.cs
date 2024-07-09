
using awqaf.Domain;
using awqaf.Dto;
using JHipsterNet.Core.Pagination;
using MediatR;

namespace awqaf.Application.Queries
{
    public class OffersCategoriesGetAllQuery : IRequest<IPage<OffersCategories>>
    {
        public IPageable Page { get; set; }
    }
}
