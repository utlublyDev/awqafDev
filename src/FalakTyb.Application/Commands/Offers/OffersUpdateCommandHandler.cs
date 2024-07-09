
using awqaf.Domain;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace awqaf.Application.Commands
{
    public class OffersUpdateCommandHandler : IRequestHandler<OffersUpdateCommand, Offers>
    {
        private IOffersRepository _offersRepository;

        public OffersUpdateCommandHandler(
            IOffersRepository offersRepository)
        {
            _offersRepository = offersRepository;
        }

        public async Task<Offers> Handle(OffersUpdateCommand command, CancellationToken cancellationToken)
        {
            var entity = await _offersRepository.CreateOrUpdateAsync(command.Offers);
            await _offersRepository.SaveChangesAsync();
            return entity;
        }
    }
}
