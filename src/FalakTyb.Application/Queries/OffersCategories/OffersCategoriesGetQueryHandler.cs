
using awqaf.Domain;
using awqaf.Dto;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace awqaf.Application.Queries
{
    public class OffersCategoriesGetQueryHandler : IRequestHandler<OffersCategoriesGetQuery, OffersCategories>
    {
        private IReadOnlyOffersCategoriesRepository _offersCategoriesRepository;

        public OffersCategoriesGetQueryHandler(
            IReadOnlyOffersCategoriesRepository offersCategoriesRepository)
        {
            _offersCategoriesRepository = offersCategoriesRepository;
        }

        public async Task<OffersCategories> Handle(OffersCategoriesGetQuery request, CancellationToken cancellationToken)
        {
            var entity = await _offersCategoriesRepository.QueryHelper()
                .GetOneAsync(offersCategories => offersCategories.Id == request.Id);
            return entity;
        }
    }
}
