
using awqaf.Domain;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using System;
namespace awqaf.Application.Commands
{
    public class ContractUpdateCommandHandler : IRequestHandler<ContractUpdateCommand, Contract>
    {
        private IContractRepository _contractRepository;
        private IProvidersRepository _providersRepository;

        public ContractUpdateCommandHandler(
            IContractRepository contractRepository, IProvidersRepository providersRepository)
        {
            _contractRepository = contractRepository;
            _providersRepository = providersRepository;
        }

        public async Task<Contract> Handle(ContractUpdateCommand command, CancellationToken cancellationToken)
        {

            if (command.Contract.ContractEndDate >= DateTime.Now)
            {
                command.Contract.Providers.IsActive = true;

                await _providersRepository.CreateOrUpdateAsync(command.Contract.Providers);


            }

            var entity = await _contractRepository.CreateOrUpdateAsync(command.Contract);
            await _contractRepository.SaveChangesAsync();
            return entity;
        }
    }
}
