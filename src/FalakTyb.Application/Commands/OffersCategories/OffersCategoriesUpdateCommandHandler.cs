
using awqaf.Domain;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace awqaf.Application.Commands
{
    public class OffersCategoriesUpdateCommandHandler : IRequestHandler<OffersCategoriesUpdateCommand, OffersCategories>
    {
        private IOffersCategoriesRepository _offersCategoriesRepository;

        public OffersCategoriesUpdateCommandHandler(
            IOffersCategoriesRepository offersCategoriesRepository)
        {
            _offersCategoriesRepository = offersCategoriesRepository;
        }

        public async Task<OffersCategories> Handle(OffersCategoriesUpdateCommand command, CancellationToken cancellationToken)
        {
            var entity = await _offersCategoriesRepository.CreateOrUpdateAsync(command.OffersCategories);
            await _offersCategoriesRepository.SaveChangesAsync();
            return entity;
        }
    }
}
