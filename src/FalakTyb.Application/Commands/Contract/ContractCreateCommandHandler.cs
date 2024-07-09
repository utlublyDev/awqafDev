
using awqaf.Domain;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace awqaf.Application.Commands
{
    public class ContractCreateCommandHandler : IRequestHandler<ContractCreateCommand, Contract>
    {
        private IContractRepository _contractRepository;

        public ContractCreateCommandHandler(
            IContractRepository contractRepository)
        {
            _contractRepository = contractRepository;
        }

        public async Task<Contract> Handle(ContractCreateCommand command, CancellationToken cancellationToken)
        {
            var entity = await _contractRepository.CreateOrUpdateAsync(command.Contract);
            await _contractRepository.SaveChangesAsync();
            return entity;
        }
    }
}
