
using awqaf.Domain;
using awqaf.Dto;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;

namespace awqaf.Application.Queries
{
    public class RedeemGetAllQueryHandler : IRequestHandler<RedeemGetAllQuery, IPage<Redeem>>
    {
        private IReadOnlyRedeemRepository _redeemRepository;

        public RedeemGetAllQueryHandler(
            IReadOnlyRedeemRepository redeemRepository)
        {
            _redeemRepository = redeemRepository;
        }

        public async Task<IPage<Redeem>> Handle(RedeemGetAllQuery request, CancellationToken cancellationToken)
        {
            var page = await _redeemRepository.QueryHelper()
                .GetPageAsync(request.Page);
            return page;
        }
    }
}
