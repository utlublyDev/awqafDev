
using awqaf.Domain;
using awqaf.Dto;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace awqaf.Application.Queries
{
    public class RedeemGetQueryHandler : IRequestHandler<RedeemGetQuery, Redeem>
    {
        private IReadOnlyRedeemRepository _redeemRepository;

        public RedeemGetQueryHandler(
            IReadOnlyRedeemRepository redeemRepository)
        {
            _redeemRepository = redeemRepository;
        }

        public async Task<Redeem> Handle(RedeemGetQuery request, CancellationToken cancellationToken)
        {
            var entity = await _redeemRepository.QueryHelper()
                .GetOneAsync(redeem => redeem.Id == request.Id);
            return entity;
        }
    }
}
