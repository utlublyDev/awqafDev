
using awqaf.Domain;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace awqaf.Application.Commands
{
    public class RedeemUpdateCommandHandler : IRequestHandler<RedeemUpdateCommand, Redeem>
    {
        private IRedeemRepository _redeemRepository;

        public RedeemUpdateCommandHandler(
            IRedeemRepository redeemRepository)
        {
            _redeemRepository = redeemRepository;
        }

        public async Task<Redeem> Handle(RedeemUpdateCommand command, CancellationToken cancellationToken)
        {
            var entity = await _redeemRepository.CreateOrUpdateAsync(command.Redeem);
            await _redeemRepository.SaveChangesAsync();
            return entity;
        }
    }
}
