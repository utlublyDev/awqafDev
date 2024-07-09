
using awqaf.Domain;
using awqaf.Dto;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;

namespace awqaf.Application.Queries
{
    public class OffersCategoriesGetAllQueryHandler : IRequestHandler<OffersCategoriesGetAllQuery, IPage<OffersCategories>>
    {
        private IReadOnlyOffersCategoriesRepository _offersCategoriesRepository;

        public OffersCategoriesGetAllQueryHandler(
            IReadOnlyOffersCategoriesRepository offersCategoriesRepository)
        {
            _offersCategoriesRepository = offersCategoriesRepository;
        }

        public async Task<IPage<OffersCategories>> Handle(OffersCategoriesGetAllQuery request, CancellationToken cancellationToken)
        {
            var page = await _offersCategoriesRepository.QueryHelper()
                .GetPageAsync(request.Page);
            return page;
        }
    }
}
