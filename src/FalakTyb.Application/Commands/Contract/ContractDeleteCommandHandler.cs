
using awqaf.Domain;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace awqaf.Application.Commands
{
    public class ContractDeleteCommandHandler : IRequestHandler<ContractDeleteCommand, Unit>
    {
        private IContractRepository _contractRepository;

        public ContractDeleteCommandHandler(
            IContractRepository contractRepository)
        {
            _contractRepository = contractRepository;
        }

        public async Task<Unit> Handle(ContractDeleteCommand command, CancellationToken cancellationToken)
        {
            await _contractRepository.DeleteByIdAsync(command.Id);
            await _contractRepository.SaveChangesAsync();
            return Unit.Value;
        }
    }
}
