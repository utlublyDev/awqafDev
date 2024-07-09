
using awqaf.Domain;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace awqaf.Application.Commands
{
    public class RedeemDeleteCommandHandler : IRequestHandler<RedeemDeleteCommand, Unit>
    {
        private IRedeemRepository _redeemRepository;

        public RedeemDeleteCommandHandler(
            IRedeemRepository redeemRepository)
        {
            _redeemRepository = redeemRepository;
        }

        public async Task<Unit> Handle(RedeemDeleteCommand command, CancellationToken cancellationToken)
        {
            await _redeemRepository.DeleteByIdAsync(command.Id);
            await _redeemRepository.SaveChangesAsync();
            return Unit.Value;
        }
    }
}
