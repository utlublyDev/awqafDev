
using awqaf.Domain;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace awqaf.Application.Commands
{
    public class OffersCategoriesCreateCommandHandler : IRequestHandler<OffersCategoriesCreateCommand, OffersCategories>
    {
        private IOffersCategoriesRepository _offersCategoriesRepository;

        public OffersCategoriesCreateCommandHandler(
            IOffersCategoriesRepository offersCategoriesRepository)
        {
            _offersCategoriesRepository = offersCategoriesRepository;
        }

        public async Task<OffersCategories> Handle(OffersCategoriesCreateCommand command, CancellationToken cancellationToken)
        {
            var entity = await _offersCategoriesRepository.CreateOrUpdateAsync(command.OffersCategories);
            await _offersCategoriesRepository.SaveChangesAsync();
            return entity;
        }
    }
}
