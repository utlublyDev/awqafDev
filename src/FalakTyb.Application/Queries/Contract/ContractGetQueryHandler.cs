
using awqaf.Domain;
using awqaf.Dto;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace awqaf.Application.Queries
{
    public class ContractGetQueryHandler : IRequestHandler<ContractGetQuery, Contract>
    {
        private IReadOnlyContractRepository _contractRepository;

        public ContractGetQueryHandler(
            IReadOnlyContractRepository contractRepository)
        {
            _contractRepository = contractRepository;
        }

        public async Task<Contract> Handle(ContractGetQuery request, CancellationToken cancellationToken)
        {
            var entity = await _contractRepository.QueryHelper()
                .Include(contract => contract.Providers)
                .GetOneAsync(contract => contract.Id == request.Id);
            return entity;
        }
    }
}
