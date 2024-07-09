
using awqaf.Domain;
using awqaf.Dto;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;
using System;
using System.Collections.Generic;

namespace awqaf.Application.Queries
{
    public class GetAllContractsExpirationQueryHandler : IRequestHandler<GetAllContractsExpirationQuery, IEnumerable<ContractRespose>>
    {
        private IReadOnlyContractRepository _contractRepository;
            private IProvidersRepository _providersRepository;
           private IContractRepository _contractRepositoryupdate;
        public GetAllContractsExpirationQueryHandler(
            IReadOnlyContractRepository contractRepository,IProvidersRepository providersRepository,IContractRepository contractRepositoryupdate)
        {
            _contractRepository = contractRepository;
           _providersRepository  = providersRepository;
           _contractRepositoryupdate = contractRepositoryupdate;
        }

        public async Task<IEnumerable<ContractRespose>> Handle(GetAllContractsExpirationQuery request, CancellationToken cancellationToken)
        {

            var page = await _contractRepository.QueryHelper()
                .Include(contract => contract.Providers).GetAllAsync();

            List<ContractRespose> exContract = new List<ContractRespose>();
            foreach (Contract contract in page)
            {

                if (contract.ContractEndDate < DateTime.Now)
                {
                  contract.Providers.IsActive = false;
                   contract.Status = false;
                    var entity = await _providersRepository.CreateOrUpdateAsync(contract.Providers);
                  await _providersRepository.SaveChangesAsync();
                var entityContract = await _contractRepositoryupdate.CreateOrUpdateAsync(contract);
                 await _contractRepositoryupdate.SaveChangesAsync();
                  


                }


            }








return exContract;

        }
    }
}
