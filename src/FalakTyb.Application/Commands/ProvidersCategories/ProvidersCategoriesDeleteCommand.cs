using awqaf.Domain;
using MediatR;

namespace awqaf.Application.Commands
{
    public class ProvidersCategoriesDeleteCommand : IRequest<Unit>
    {
        public long Id { get; set; }
    }
}
