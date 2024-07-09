
using awqaf.Domain;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace awqaf.Application.Commands
{
    public class OffersDeleteCommandHandler : IRequestHandler<OffersDeleteCommand, Unit>
    {
        private IOffersRepository _offersRepository;

        public OffersDeleteCommandHandler(
            IOffersRepository offersRepository)
        {
            _offersRepository = offersRepository;
        }

        public async Task<Unit> Handle(OffersDeleteCommand command, CancellationToken cancellationToken)
        {
            await _offersRepository.DeleteByIdAsync(command.Id);
            await _offersRepository.SaveChangesAsync();
            return Unit.Value;
        }
    }
}
