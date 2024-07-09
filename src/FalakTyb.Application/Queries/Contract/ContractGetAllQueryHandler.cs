
using awqaf.Domain;
using awqaf.Dto;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;

namespace awqaf.Application.Queries
{
    public class ContractGetAllQueryHandler : IRequestHandler<ContractGetAllQuery, IPage<Contract>>
    {
        private IReadOnlyContractRepository _contractRepository;

        public ContractGetAllQueryHandler(
            IReadOnlyContractRepository contractRepository)
        {
            _contractRepository = contractRepository;
        }

        public async Task<IPage<Contract>> Handle(ContractGetAllQuery request, CancellationToken cancellationToken)
        {
            var page = await _contractRepository.QueryHelper()
                .Include(contract => contract.Providers)
                .GetPageAsync(request.Page);
            return page;
        }
    }
}
