
using awqaf.Domain;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace awqaf.Application.Commands
{
    public class OffersCategoriesDeleteCommandHandler : IRequestHandler<OffersCategoriesDeleteCommand, Unit>
    {
        private IOffersCategoriesRepository _offersCategoriesRepository;

        public OffersCategoriesDeleteCommandHandler(
            IOffersCategoriesRepository offersCategoriesRepository)
        {
            _offersCategoriesRepository = offersCategoriesRepository;
        }

        public async Task<Unit> Handle(OffersCategoriesDeleteCommand command, CancellationToken cancellationToken)
        {
            await _offersCategoriesRepository.DeleteByIdAsync(command.Id);
            await _offersCategoriesRepository.SaveChangesAsync();
            return Unit.Value;
        }
    }
}
