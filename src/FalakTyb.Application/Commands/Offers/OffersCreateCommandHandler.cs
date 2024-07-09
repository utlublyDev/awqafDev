
using awqaf.Domain;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace awqaf.Application.Commands
{
    public class OffersCreateCommandHandler : IRequestHandler<OffersCreateCommand, Offers>
    {
        private IOffersRepository _offersRepository;

        public OffersCreateCommandHandler(
            IOffersRepository offersRepository)
        {
            _offersRepository = offersRepository;
        }

        public async Task<Offers> Handle(OffersCreateCommand command, CancellationToken cancellationToken)
        {
            var entity = await _offersRepository.CreateOrUpdateAsync(command.Offers);
            await _offersRepository.SaveChangesAsync();
            return entity;
        }
    }
}
