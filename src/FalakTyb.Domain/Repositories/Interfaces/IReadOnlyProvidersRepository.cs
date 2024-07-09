using System.Collections.Generic;
using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;

namespace awqaf.Domain.Repositories.Interfaces
{

    public interface IReadOnlyProvidersRepository : IReadOnlyGenericRepository<Providers, long>
    {

        //get all providers by main service id

        public Task<IEnumerable<Providers>> GetAllByMainServiceId(long mainServiceId);





        public Task<IEnumerable<Providers>> GetAllByProviderByHoldingCompany(long categoryId);
        //get all provider vip
        public Task<IEnumerable<Providers>> getAllProviderVip();

        public Task<IEnumerable<Providers>> SearchProviderByWords(string words, long categoryId);

        public Task<IEnumerable<Providers>> SearchProviderByMainProviderIdAndWords(string words, long MainId);





        public Task<IEnumerable<Providers>> SearchProviderByWords(string words);


    }

}
